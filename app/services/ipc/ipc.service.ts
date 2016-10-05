import { Injectable } from '@angular/core';

import {Subject} from 'rxjs/Subject'
import {Observable} from 'rxjs/Observable'

import { AbstractNotificationService } from '../notification/abstractNotificationService'
import { ExecutionResult, JsonExecutionResult } from '../../model/ExecutionResult'

import { remote, ipcRenderer } from 'electron';

@Injectable()
export class IpcService extends AbstractNotificationService{

    private loadExecutionResultEventsEmitter: Subject<any>

    constructor() {
        super("IpcService")
        // loadExecutionResult
        this.loadExecutionResultEventsEmitter = new Subject<any>();
        ipcRenderer.on('load-ExecutionResult', this.loadExecutionResult); 
    }

    private loadExecutionResult = (event, executionResultJson: JsonExecutionResult): void => {
        this.notifyMsg("loadExecutionResult received")
        this.notifyMsg(executionResultJson.algorithm)
        this.loadExecutionResultEventsEmitter.next(executionResultJson)
    }

    public getLoadExecutionResultEvents(): Observable<any>{
       return this.loadExecutionResultEventsEmitter.asObservable()
    }
}