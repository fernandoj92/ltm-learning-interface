import { Injectable } from '@angular/core';

import { Stream } from '../../model/stream'
import { AbstractNotificationService } from '../notification/abstractNotificationService'
import * as JsonTransform from '../../util/JsonTransform'
import * as UUID from '../../util/uuid'

import { remote, ipcRenderer } from 'electron';
 
@Injectable()
export class InMemoryDataService extends AbstractNotificationService{

    private streams: Stream[]

    constructor(){
        super('InMemoryDataService')
        this.streams =  new Array();
        ipcRenderer.on('load-Bn', function(event, executionResult){
            this.notifyMsg('load-ExecutionResult event received')

            
        });
    }

    public getStreamsReference(){ return this.streams }
    
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
            // Notify the parsing result
            this.notifyMsg(JSON.stringify(executionResult))

        }catch(err){
            this.notifyError(err)
        }
    }


}