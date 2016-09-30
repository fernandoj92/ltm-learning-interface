import { Injectable } from '@angular/core';

import { Stream } from '../../model/stream'
import { AbstractNotificationService } from '../notification/abstractNotificationService'
import * as JsonTransform from '../../util/JsonTransform'
import * as UUID from '../../util/uuid'

import {Subject} from 'rxjs/Subject'
import {Observable} from 'rxjs/Observable'

import { remote, ipcRenderer } from 'electron';
 
@Injectable()
export class InMemoryDataService extends AbstractNotificationService{

    private streams: Stream[]
    private streamsEventEmitter: Subject<string>

    constructor(){
        super('InMemoryDataService')
        this.streams =  new Array();
        ipcRenderer.on('load-ExecutionResult', this.loadExecutionResult);
    }

    public getStreamsReference(): Stream[]{ return this.streams }

    public getStreamsEventEmitter(): Observable<string>{
       if(!this.streamsEventEmitter)
            this.streamsEventEmitter = new Subject<string>();

       return this.streamsEventEmitter.asObservable()
    }
    
    private loadExecutionResult = (event, executionResult): void => {
        try
        {
            // Test notification
            this.notifyMsg('load-ExecutionResult event received')
            // Json transformation
            JsonTransform.checkExecutionResultJson(executionResult)
            // Create a new stream object
            let newFileStreamUUID = UUID.randomUUID()
            let newFileStream =  new Stream(
                [executionResult], 
                newFileStreamUUID, 
                "File Stream "+ newFileStreamUUID)
            this.streams.push(newFileStream)
            // Notify the subscribed components
            this.newStreamEvent(newFileStream)

        }catch(err){
            this.notifyError(err)
        }
    }

    // Memory -> View
    // View -> Memory
    private updateStreamEvent(stream: Stream): void {
        this.notifyMsg("Stream "+ stream.UUID + "updated")
        this.streamsEventEmitter.next("update-stream")
    }

    // Memory -> View
    private newStreamEvent(stream: Stream): void {
        this.notifyMsg("new Stream "+ stream.UUID)
        this.streamsEventEmitter.next("new-stream")
    }

    // View -> Memory 
    // Por lo tanto, es necesario ?
    private deleteStreamEvent(stream: Stream): void {
        this.notifyMsg("Stream "+ stream.UUID +" deleted")
        this.streamsEventEmitter.next("delete-stream")
    }

}