import { Injectable } from '@angular/core';

import { Stream } from '../../model/stream'
import { IdCollection } from '../../model/abstract/idCollection'
import { AbstractNotificationService } from '../notification/abstractNotificationService'
import * as JsonTransform from '../../util/JsonTransform'
import * as UUID from '../../util/uuid'
import { IpcService } from '../ipc/ipc.service'

import {Subject} from 'rxjs/Subject'
import {Observable} from 'rxjs/Observable'
 
@Injectable()
export class InMemoryDataService extends AbstractNotificationService{

    private streams: IdCollection<Stream>;
    private streamsEventEmitter: Subject<string>;
    private ipcLoadExecutionResultEvents: Observable<string>;
    private ipcLoadExecutionResultEventsSubscription;

    constructor(private _ipcService: IpcService){
        super('InMemoryDataService')
        this.streams =  new IdCollection<Stream>();
        this.ipcLoadExecutionResultEvents =  this._ipcService.getLoadExecutionResultEvents()
        this.ipcLoadExecutionResultEventsSubscription =  this.ipcLoadExecutionResultEvents
        .subscribe(
            (executionResultJson) => this.saveExecutionResult(executionResultJson),
            (error) => this.notifyMsg('IPC loadExecutionResult event error')
        )
    }

    public getStreamsReference(): IdCollection<Stream> { return this.streams }

    public getStreamsEventEmitter(): Observable<string> {
       if(!this.streamsEventEmitter)
            this.streamsEventEmitter = new Subject<string>();

       return this.streamsEventEmitter.asObservable()
    }

    private saveExecutionResult = (executionResultJson: any): void =>{
        try {
            // Test notification message
            this.notifyMsg('IPC loadExecutionResult event succesfully received')
            // Json transformation
            JsonTransform.checkExecutionResultJson(executionResultJson)
            /*
            if(executionResultJson.streamUUID === void 0){

            }

            if(executionResultJson.streamUUID){

            }*/
            // Create a new stream object
            let newFileStreamUUID = UUID.randomUUID()
            let newFileStream =  new Stream(
                [executionResultJson], 
                newFileStreamUUID, 
                "File Stream "+ newFileStreamUUID)
            this.streams.add(newFileStream)
            // Notify the subscribed components
            this.newStreamEvent(newFileStream)

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
    private deleteStreamEvent(stream: Stream): void {
        this.notifyMsg("Stream "+ stream.getId() +" deleted")
        this.streamsEventEmitter.next("delete-stream")
    }

}