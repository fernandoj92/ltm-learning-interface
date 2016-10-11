import { Injectable } from '@angular/core';

import { IdCollection } from '../../model/abstract/idCollection'
import { Stream } from '../../model/stream'
import { ExecutionResult, JsonExecutionResult } from '../../model/ExecutionResult'
import { AbstractNotificationService } from '../notification/abstractNotificationService'
import { IpcService } from '../ipc/ipc.service'
import * as JsonTransform from '../../util/JsonTransform'
import * as UUID from '../../util/uuid'

import {Subject} from 'rxjs/Subject'
import {Observable} from 'rxjs/Observable'
 
@Injectable()
export class InMemoryDataService extends AbstractNotificationService{

    private streams: IdCollection<Stream>;
    private streamsEventEmitter: Subject<string>;
    private ipcLoadExecutionResultEvents: Observable<JsonExecutionResult>;
    private ipcLoadExecutionResultEventsSubscription;

    constructor(private _ipcService: IpcService){
        super('InMemoryDataService')
        this.streams =  new IdCollection<Stream>();
        this.ipcLoadExecutionResultEvents =  this._ipcService.getLoadExecutionResultEvents()
        this.ipcLoadExecutionResultEventsSubscription =  this.ipcLoadExecutionResultEvents
        .subscribe(
            (executionResultJson) => this.loadERinMemory(executionResultJson),
            (error) => this.notifyMsg('IPC loadExecutionResult event error')
        )
    }

    public getStreamsReference(): IdCollection<Stream> { return this.streams }

    public getStreamsEventEmitter(): Observable<string> {
       if(!this.streamsEventEmitter)
            this.streamsEventEmitter = new Subject<string>();

       return this.streamsEventEmitter.asObservable()
    }

    private loadERinMemory = (executionResultJson: JsonExecutionResult): void =>{
        try {
            // Test notification message
            this.notifyMsg('IPC loadExecutionResult event succesfully received')
            // Json transformation
            JsonTransform.checkExecutionResultJson(executionResultJson)
            // Create the model object equivalent for JsonExecutionResult
            let newExecutionResult: ExecutionResult = ExecutionResult.construct(executionResultJson)
            
            // Check if its corresponding stream currently exists in memory
            if(newExecutionResult.streamId === void 0){
                let newFileStreamUUID = UUID.randomUUID()
                let erCollection = new IdCollection<ExecutionResult>();
                newExecutionResult.streamId = newFileStreamUUID
                erCollection.add(newExecutionResult)
                let streamCreateDate = new Date()
                let newFileStream =  new Stream(
                    erCollection, 
                    newFileStreamUUID, 
                    "File Stream "+ newFileStreamUUID,
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
                    "File Stream "+ streamCreateDate.format("HH:MM:SS DD-MM-YYYY"),
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