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
    private showRunAlgorithmModalEventEmitter: Subject<AvailableAlgorithms>;
    // Event receivers
    private ipcRunAlgorithmEvents: Observable<AvailableAlgorithms>;
    private ipcRunAlgorithmEventsSubscription;

    constructor(private _ipcInputService: IpcInputService) {
        super('RunAlgorithmService')

        this.showRunAlgorithmModalEventEmitter = new Subject<AvailableAlgorithms>();

        this.ipcRunAlgorithmEvents =  this._ipcInputService.getRunAlgorithmEvents();
        this.ipcRunAlgorithmEventsSubscription =  this.ipcRunAlgorithmEvents
        .subscribe(
            (algorithm) => this.runAlgorithm(algorithm),
            (error) => this.notifyMsg('IPC runAlgorithm event error')
        );
    }

    public getShowRunAlgorithmModalEvents(): Observable<AvailableAlgorithms> {
        return this.showRunAlgorithmModalEventEmitter.asObservable();
    }

    // HTTP
    public executeABI(): void {
        this.notifyMsg("executing the ABI algorithm");
    }

    // Websocket
    public executeSALL(): void {
        this.notifyMsg("executing the SALL algorithm");
    }

    private runAlgorithm(algorithm: AvailableAlgorithms): void {
        this.showRunAlgorithmModalEventEmitter.next(algorithm);
    }

}