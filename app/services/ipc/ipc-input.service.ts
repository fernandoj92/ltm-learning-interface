import { Injectable } from '@angular/core';

import {Subject} from 'rxjs/Subject'
import {Observable} from 'rxjs/Observable'

import { AbstractNotificationService } from '../notification/abstractNotificationService'
import { ExecutionResult, JsonExecutionResult } from '../../model/executionResult'
import { Stream } from '../../model/stream'
import { AvailableAlgorithms } from '../../model/algorithms/availableAlgorithms'

import { remote, ipcRenderer } from 'electron';

@Injectable()
export class IpcInputService extends AbstractNotificationService{

    // Event emitters
    private loadExecutionResultEventsEmitter: Subject<JsonExecutionResult>
    private runAlgorithmEventsEmitter: Subject<AvailableAlgorithms>

    constructor() {

        super("IPC-input Service")

        // Events emitters initialization
        this.loadExecutionResultEventsEmitter = new Subject<JsonExecutionResult>();
        this.runAlgorithmEventsEmitter = new Subject<AvailableAlgorithms>();

        // ===== ipc messages =====
        //  loadExecutionResult
        ipcRenderer.on('load-ExecutionResult', this.loadExecutionResult); 
        // runAlgorithmABI
        ipcRenderer.on('run-abi', this.runABI);
        // runAlgorithmSALL
        ipcRenderer.on('run-sall', this.runSALL);
    }

    public getLoadExecutionResultEvents(): Observable<JsonExecutionResult>{
        return this.loadExecutionResultEventsEmitter.asObservable();
    }

    public getRunAlgorithmEvents(): Observable<AvailableAlgorithms>{
        return this.runAlgorithmEventsEmitter.asObservable();
    }

    private loadExecutionResult = (event, executionResultJson: JsonExecutionResult): void => {
        this.notifyMsg("loadExecutionResult received");
        this.loadExecutionResultEventsEmitter.next(executionResultJson);
    }

    private runABI = (event, msgContent): void => {
        this.notifyMsg("run-abi received");
        this.runAlgorithmEventsEmitter.next(AvailableAlgorithms.ABI);
    }

    private runSALL = (event, msgContent): void => {
        this.notifyMsg("run-sall received");
        this.runAlgorithmEventsEmitter.next(AvailableAlgorithms.SALL);
    }
}