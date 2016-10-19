import { Component, OnInit } from '@angular/core';

import {Subject} from 'rxjs/Subject'
import {Observable} from 'rxjs/Observable'

import { InMemoryDataService } from '../services/storage/in-memory-data.service'
import { IpcInputService } from '../services/ipc/ipc-input.service'
import { IpcOutputService } from '../services/ipc/ipc-output.service'
import { RunAlgorithmService } from '../run-algorithm/run-algorithm.service'

@Component({
    moduleId: module.id,
    selector: 'service-notifications',
    templateUrl: 'service-notifications.component.html'
})
export class ServiceNotificationsComponent implements OnInit {

    // InMemoryDataService
    private inMemoryServiceNotifications: Observable<string>
    private inMemoryServiceNotificationsSubscription
    // IpcInputService
    private ipcInputServiceNotifications: Observable<string>
    private ipcInputServiceNotificationsSubscription
    //IpcOutputService
    private ipcOutputServiceNotifications: Observable<string>
    private ipcOutputServiceNotificationsSubscription
    // RunAlgorithmService
    private runAlgorithmServiceNotifications: Observable<string>
    private runAlgorithmServiceNotificationsSubscription

    constructor(
        private _inMemoryDataService: InMemoryDataService,
        private _ipcInputService: IpcInputService, 
        private _ipcOutputService: IpcOutputService,
        private _runAlgorithmService: RunAlgorithmService) { }

    ngOnInit() {

        // InMemoryDataService
        this.inMemoryServiceNotifications = this._inMemoryDataService.getNotificationGenerator()
        this.inMemoryServiceNotificationsSubscription = this.inMemoryServiceNotifications.subscribe(
            (msg) => { this.logMessageFunc(this._inMemoryDataService.name(), msg) },
            (err) => { this.logErrorFunc(this._inMemoryDataService.name(), err) },
            ()    => { this.logCompletedFunc(this._inMemoryDataService.name())}
        );

        // IpcInputService
        this.ipcInputServiceNotifications = this._ipcInputService.getNotificationGenerator()
        this.ipcInputServiceNotificationsSubscription = this.ipcInputServiceNotifications.subscribe(
            (msg) => { this.logMessageFunc(this._ipcInputService.name(), msg) },
            (err) => { this.logErrorFunc(this._ipcInputService.name(), err) },
            ()    => { this.logCompletedFunc(this._ipcInputService.name())}
        );

        // IpcOutputService
        this.ipcOutputServiceNotifications = this._ipcOutputService.getNotificationGenerator()
        this.ipcOutputServiceNotificationsSubscription = this.ipcOutputServiceNotifications.subscribe(
            (msg) => { this.logMessageFunc(this._ipcOutputService.name(), msg) },
            (err) => { this.logErrorFunc(this._ipcOutputService.name(), err) },
            ()    => { this.logCompletedFunc(this._ipcOutputService.name())}
        );

        // RunAlgorithmService
        this.runAlgorithmServiceNotifications =  this._runAlgorithmService.getNotificationGenerator();
        this.runAlgorithmServiceNotificationsSubscription = this.runAlgorithmServiceNotifications.subscribe(
            (msg) => { this.logMessageFunc(this._runAlgorithmService.name(), msg) },
            (err) => { this.logErrorFunc(this._runAlgorithmService.name(), err) },
            ()    => { this.logCompletedFunc(this._runAlgorithmService.name())}
        );
     }

     private logMessageFunc = (service: string, msg: string) => {
         console.log(service + ': ' + msg)
     }

     private logErrorFunc = (service:string, err) => {
         console.log(service + ': ' + err)
     }

     private logCompletedFunc = (service: string) => {
         console.log(service + ': ' + 'Completed')
     }
}