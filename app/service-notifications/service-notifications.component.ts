import { Component, OnInit } from '@angular/core';

import {Subject} from 'rxjs/Subject'
import {Observable} from 'rxjs/Observable'

import { InMemoryDataService } from '../services/storage/in-memory-data.service'
import { IpcService } from '../services/ipc/ipc.service'

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
        private _ipcService: IpcService) { }

    ngOnInit() {

        // InMemoryDataService
        this.inMemoryServiceNotifications = this._inMemoryDataService.getNotificationGenerator()
        this.inMemoryServiceNotificationsSubscription = this.inMemoryServiceNotifications.subscribe(
            (msg) => { this.logMessageFunc(this._inMemoryDataService.name(), msg) },
            (err) => { this.logErrorFunc(this._inMemoryDataService.name(), err) },
            ()    => { this.logCompletedFunc(this._inMemoryDataService.name())}
        )

        // IpcService
        this.ipcServiceNotifications = this._ipcService.getNotificationGenerator()
        this.ipcServiceNotificationsSubscription = this.ipcServiceNotifications.subscribe(
            (msg) => { this.logMessageFunc(this._ipcService.name(), msg) },
            (err) => { this.logErrorFunc(this._ipcService.name(), err) },
            ()    => { this.logCompletedFunc(this._ipcService.name())}
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