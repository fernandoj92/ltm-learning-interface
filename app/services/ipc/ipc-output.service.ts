import { Injectable } from '@angular/core';

import {Subject} from 'rxjs/Subject'
import {Observable} from 'rxjs/Observable'

import { AbstractNotificationService } from '../notification/abstractNotificationService'
import { InMemoryDataService } from '../storage/in-memory-data.service'
import { ExecutionResult, FileOutExecutionResult } from '../../model/executionResult'
import { Stream } from '../../model/stream'

import { remote, ipcRenderer } from 'electron';

@Injectable()
export class IpcOutputService extends AbstractNotificationService{

    // Event receivers
    private exportExecutionResultEvents: Observable<FileOutExecutionResult>
    private exportExecutionResultEventsSubscription
    private exportStreamEvents: Observable<Stream>
    private exportStreamEventsSubscrition

    constructor(private _inMemoryDataService: InMemoryDataService) {
        super("IPC-output Service")
        this.notifyMsg("ipc_output creado")
        // Export ER events
        this.exportExecutionResultEvents =  this._inMemoryDataService.getExportExecutionResultEvents();
        this.exportExecutionResultEventsSubscription =  this.exportExecutionResultEvents
        .subscribe(
            (fileOutExecutionResult) => this.notifyMsg("fileOutExecutionResult received"), //this.sendIpcExportExecutionResult(fileOutExecutionResult),
            (error) => this.notifyMsg('IPC exportExecutionResult event error')
        );

        // Export Stream events
        this.exportStreamEvents =  this._inMemoryDataService.getExportStreamEvents();
        this.exportStreamEventsSubscrition =  this.exportStreamEvents
        .subscribe(
            (stream) => this.sendIpcExportStream(stream),
            (error) => this.notifyMsg('IPC exportExecutionResult event error')
        );
    }

    private sendIpcExportExecutionResult(fileOutExecutionResult: FileOutExecutionResult){
        this.notifyMsg("sending ipc export result msg");
        // TODO: try without the double parse
        ipcRenderer.send('export-ExecutionResult', JSON.parse(JSON.stringify(fileOutExecutionResult)));
    }

    private sendIpcExportStream(stream: Stream){
        this.notifyMsg("sending ipc export stream msg");
    }

}