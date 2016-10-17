import { Component, OnInit } from '@angular/core';

import {Subject} from 'rxjs/Subject'
import {Observable} from 'rxjs/Observable'

import { InMemoryDataService } from '../services/storage/in-memory-data.service'
import { IpcInputService } from '../services/ipc/ipc-input.service'
import { IpcOutputService } from '../services/ipc/ipc-output.service'

@Component({
    moduleId: module.id,
    selector: 'service-notifications',
    templateUrl: 'service-notifications.component.html'
})
export class ServiceNotificationsComponent implements OnInit {

    // InMemoryDataService
    private inMemoryServiceNotifications: Observable<string>
    private inMemoryServiceNotificationsSubscription
    // IpcService
    private ipcServiceNotifications: Observable<string>
    private ipcServiceNotificationsSubscription

    constructor(
        private _inMemoryDataService: InMemoryDataService,
        private _ipcInputService: IpcInputService) { }

    ngOnInit() {

        // InMemoryDataService
        this.inMemoryServiceNotifications = this._inMemoryDataService.getNotificationGenerator()
        this.inMemoryServiceNotificationsSubscription = this.inMemoryServiceNotifications.subscribe(
            (msg) => { this.logMessageFunc(this._inMemoryDataService.name(), msg) },
            (err) => { this.logErrorFunc(this._inMemoryDataService.name(), err) },
            ()    => { this.logCompletedFunc(this._inMemoryDataService.name())}
        )

        // IpcService
        this.ipcServiceNotifications = this._ipcInputService.getNotificationGenerator()
        this.ipcServiceNotificationsSubscription = this.ipcServiceNotifications.subscribe(
            (msg) => { this.logMessageFunc(this._ipcInputService.name(), msg) },
            (err) => { this.logErrorFunc(this._ipcInputService.name(), err) },
            ()    => { this.logCompletedFunc(this._ipcInputService.name())}
        )
        
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