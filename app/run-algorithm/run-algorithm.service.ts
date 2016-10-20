import { Injectable } from '@angular/core';

import {Subject} from 'rxjs/Subject'
import {Observable} from 'rxjs/Observable'

import { AbstractNotificationService } from '../services/notification/abstractNotificationService'
import { IpcInputService } from '../services/ipc/ipc-input.service'
import { AvailableAlgorithms } from '../model/algorithms/availableAlgorithms'

// This service acts as an intermediary between the Electron menu and the http/Websocket msg sending,
// it will send a request to the runAlgorithmComponent to open the appropiate modal that will send
// the appropiate hhtp/Websocket command for the execution of the algorithm in the server

@Injectable()
export class RunAlgorithmService extends AbstractNotificationService{

    // Event emitters
    private showRunABIModalEventEmitter: Subject<string>;
    private showRunSALLModalEventEmitter: Subject<string>;
    // Event receivers
    private ipcRunAlgorithmEvents: Observable<AvailableAlgorithms>;
    private ipcRunAlgorithmEventsSubscription;

    constructor(private _ipcInputService: IpcInputService) {
        super('RunAlgorithmService')

        this.showRunABIModalEventEmitter = new Subject<string>();
        this.showRunSALLModalEventEmitter = new Subject<string>();

        this.ipcRunAlgorithmEvents =  this._ipcInputService.getRunAlgorithmEvents();
        this.ipcRunAlgorithmEventsSubscription =  this.ipcRunAlgorithmEvents
        .subscribe(
            (algorithm) => this.runAlgorithm(algorithm),
            (error) => this.notifyMsg('IPC runAlgorithm event error')
        );
    }

    getShowRunABIModalEvents(): Observable<string> {
        return this.showRunABIModalEventEmitter.asObservable();
    }

    getShowRunSALLModalEvents(): Observable<string> {
        return this.showRunSALLModalEventEmitter.asObservable();
    }

    // HTTP
    executeABI(): void {
        this.notifyMsg("executing the ABI algorithm");
    }

    // Websocket
    executeSALL(): void {
        this.notifyMsg("executing the SALL algorithm");
    }

    private runAlgorithm(algorithm: AvailableAlgorithms): void {
        this.notifyMsg("run-algorithm")
        // Aqui enviamos el mensage al componente específico
       switch(algorithm){
            case AvailableAlgorithms.ABI: this.showABIModal(); break;
            case AvailableAlgorithms.SALL: this.showSALLModal(); break;
        }
    }

    private showABIModal(): void {
        this.notifyMsg("show-abi")
        this.showRunABIModalEventEmitter.next("run-abi");
    }

    private showSALLModal(): void {
        this.notifyMsg("show-sall")
        this.showRunSALLModalEventEmitter.next("run-sall");
    }

}