import { Injectable } from '@angular/core';

import {Subject} from 'rxjs/Subject'
import {Observable} from 'rxjs/Observable'

import { AbstractNotificationService } from '../notification/abstractNotificationService'
import { ExecutionResult, JsonExecutionResult } from '../../model/executionResult'
import { Stream } from '../../model/stream'

import { remote, ipcRenderer } from 'electron';

@Injectable()
export class IpcInputService extends AbstractNotificationService{

    // Event emitters
    private loadExecutionResultEventsEmitter: Subject<JsonExecutionResult>

    constructor() {
        super("IPC-input Service")

        // loadExecutionResult
        ipcRenderer.on('load-ExecutionResult', this.loadExecutionResult); 
    }

    private loadExecutionResult = (event, executionResultJson: JsonExecutionResult): void =>{
        this.notifyMsg("loadExecutionResult received")
        this.notifyMsg(executionResultJson.algorithm)
        this.loadExecutionResultEventsEmitter.next(executionResultJson)
    }

    public getLoadExecutionResultEvents(): Observable<JsonExecutionResult>{
        if(!this.loadExecutionResultEventsEmitter)
            this.loadExecutionResultEventsEmitter = new Subject<JsonExecutionResult>();

        return this.loadExecutionResultEventsEmitter.asObservable()
    }
}