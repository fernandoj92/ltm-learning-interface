import { Injectable } from '@angular/core';

import { IdCollection } from '../../model/abstract/idCollection'
import { Stream } from '../../model/stream'
import { ExecutionResult, JsonExecutionResult, FileOutExecutionResult } from '../../model/executionResult'
import { AbstractNotificationService } from '../notification/abstractNotificationService'
import { IpcInputService } from '../ipc/ipc-input.service'
import { HttpService } from '../http/http.service'
import * as JsonTransform from '../../util/jsonTransform'
import * as UUID from '../../util/uuid'

import {Subject} from 'rxjs/Subject'
import {Observable} from 'rxjs/Observable'
import * as moment from 'moment'
 
@Injectable()
export class InMemoryDataService extends AbstractNotificationService{

    private streams: IdCollection<Stream>;
    // Event emitters
    private streamsEventEmitter: Subject<string>;
    private ipcExportExecutionResultEventEmitter: Subject<FileOutExecutionResult>
    private ipcExportStreamEventEmitter: Subject<Stream>
    // Event receivers
    private ipcLoadExecutionResultEvents: Observable<JsonExecutionResult>;
    private ipcLoadExecutionResultEventsSubscription;
    private httpRunABIExecutionResultEvents: Observable<JsonExecutionResult>;
    private httpRunABIExecutionResultEventsSubscription;

    constructor(private _ipcInputService: IpcInputService,
                private _httpService: HttpService){
        super('InMemoryDataService')
        this.streams =  new IdCollection<Stream>();

        this.streamsEventEmitter = new Subject<string>();
        this.ipcExportExecutionResultEventEmitter = new Subject<FileOutExecutionResult>();
        this.ipcExportStreamEventEmitter = new Subject<Stream>();

        // IPC-In loadExecutionResult
        this.ipcLoadExecutionResultEvents =  this._ipcInputService.getLoadExecutionResultEvents();
        this.ipcLoadExecutionResultEventsSubscription =  this.ipcLoadExecutionResultEvents
        .subscribe(
            (executionResultJson) => this.loadResultInMemory(executionResultJson, 'File'),
            (error) => this.notifyMsg('IPC loadExecutionResult event error')
        );
        
        // HTPP RunABIExecutionResult
        this.httpRunABIExecutionResultEvents = this._httpService.getRunABIResultEvents();
        this.httpRunABIExecutionResultEventsSubscription = this.httpRunABIExecutionResultEvents.subscribe(
            (executionResultJson) => this.loadResultInMemory(executionResultJson, 'Http'),
            (error) => this.notifyMsg('Http RunABIExecutionResult event error')
        );
    }

    public getStreamsReference(): IdCollection<Stream> { 
        return this.streams 
    }

    public getStreamsEventEmitter(): Observable<string> {
       return this.streamsEventEmitter.asObservable()
    }

    public getExportExecutionResultEvents(): Observable<FileOutExecutionResult>{
        return this.ipcExportExecutionResultEventEmitter.asObservable();
    }

    public getExportStreamEvents(): Observable<Stream>{            
        return this.ipcExportStreamEventEmitter.asObservable();
    }

    public exportExecutionResult(executionResultCopy: ExecutionResult, fileFormat: string, includeStreamId: boolean){
        if(includeStreamId === false)
            executionResultCopy.streamId = ""

        // Send an IPC export message to the electron base
        let fileOutExecutionResult = new FileOutExecutionResult(executionResultCopy, fileFormat)
        console.log(fileOutExecutionResult)
        this.ipcExportExecutionResultEventEmitter.next(fileOutExecutionResult)
    }

    public exportStream(streamCopy: Stream, fileFormat: string){
        // TODO: junto con el import
    }

    private loadResultInMemory = (executionResultJson: JsonExecutionResult, type: string): void =>{
        try {
            // Json transformation
            JsonTransform.checkExecutionResultJson(executionResultJson)
            // Create the model object equivalent for JsonExecutionResult
            let newExecutionResult: ExecutionResult = ExecutionResult.construct(executionResultJson)
            
            // Check if its corresponding stream currently exists in memory
            if(newExecutionResult.streamId === void 0){
                let newStreamUUID = UUID.randomUUID()
                let erCollection = new IdCollection<ExecutionResult>();
                newExecutionResult.streamId = newStreamUUID
                erCollection.add(newExecutionResult)
                let streamCreateDate = new Date()
                let newFileStream =  new Stream(
                    erCollection, 
                    newStreamUUID, 
                    type + " Stream "+  moment(streamCreateDate).format("HH:MM:SS DD-MM-YYYY"),
                    streamCreateDate)
                this.streams.add(newFileStream)
                // Notify the subscribed components
                this.newStreamEvent(newFileStream)
            
            // If the result provides a streamId, we make use of it
            }else if(!this.streams.containsId(newExecutionResult.streamId)){
                let erCollection = new IdCollection<ExecutionResult>();
                erCollection.add(newExecutionResult)
                let streamCreateDate = new Date()
                let newFileStream =  new Stream(
                    erCollection, 
                    newExecutionResult.streamId, 
                    type + " Stream "+ moment(streamCreateDate).format("HH:MM:SS DD-MM-YYYY"),
                    streamCreateDate)
                this.streams.add(newFileStream)
                // Notify the subscribed components
                this.newStreamEvent(newFileStream)

            // The result provides a streamId and its corresponding stream is currently stored in memory
            } else {
                let erStream = this.streams.get(newExecutionResult.streamId)
                erStream.push(newExecutionResult)
                // Notify the subscribed components
                this.updateStreamEvent(erStream)
            }
        }catch(err){
            this.notifyError(err)
        }
    }

    // Memory -> View
    // View -> Memory
    private updateStreamEvent(stream: Stream): void {
        this.notifyMsg("Stream "+ stream.getId() + "updated")
        this.streamsEventEmitter.next("update-stream")
    }

    // Memory -> View
    private newStreamEvent(stream: Stream): void {
        this.notifyMsg("new Stream "+ stream.getId())
        this.streamsEventEmitter.next("new-stream")
    }

    // View -> Memory 
    // Por lo tanto, es necesario ?
    private deleteStreamEvent(streamId: string): void {
        this.notifyMsg("Stream "+ streamId +" deleted")
        this.streamsEventEmitter.next("delete-stream")
    }

}