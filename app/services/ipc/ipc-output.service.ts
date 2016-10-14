import { Injectable } from '@angular/core';

import {Subject} from 'rxjs/Subject'
import {Observable} from 'rxjs/Observable'

import { AbstractNotificationService } from '../notification/abstractNotificationService'
import { InMemoryDataService } from '../storage/in-memory-data.service'
import { ExecutionResult, JsonExecutionResult } from '../../model/executionResult'
import { Stream } from '../../model/stream'

import { remote, ipcRenderer } from 'electron';

@Injectable()
export class IpcOutputService extends AbstractNotificationService{

    // Event receivers
    private exportExecutionResultEvents: Observable<ExecutionResult>
    private exportExecutionResultEventsSubscription
    private exportStreamEvents: Observable<Stream>
    private exportStreamEventsSubscrition

    constructor(private _inMemoryDataService: InMemoryDataService) {
        super("IPC-output Service")
        
        // Export ER events
        this.exportExecutionResultEvents =  this._inMemoryDataService.getExportExecutionResultEvents();
        this.exportExecutionResultEventsSubscription =  this.exportExecutionResultEvents
        .subscribe(
            (executionResult) => this.sendIpcExportExecutionResult(executionResult),
            (error) => this.notifyMsg('IPC loadExecutionResult event error')
        );

        // Export Stream events
        this.exportStreamEvents =  this._inMemoryDataService.getExportStreamEvents();
        this.exportStreamEventsSubscrition =  this.exportStreamEvents
        .subscribe(
            (stream) => this.sendIpcExportStream(stream),
            (error) => this.notifyMsg('IPC loadExecutionResult event error')
        );
    }

    private sendIpcExportExecutionResult(executionResult: ExecutionResult){
        this.notifyMsg("sending ipc export result msg");
    }

    private sendIpcExportStream(stream: Stream){
        this.notifyMsg("sending ipc export stream msg");
    }

}