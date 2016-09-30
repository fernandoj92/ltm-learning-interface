import { Component, OnInit } from '@angular/core';

import {Subject} from 'rxjs/Subject'

import { InMemoryDataService } from '../services/storage/in-memory-data.service'

@Component({
    moduleId: module.id,
    selector: 'service-notifications',
    templateUrl: 'service-notifications.component.html'
})
export class ServiceNotificationsComponent implements OnInit {

    private inMemoryServiceNotifications: Subject<string>
    private inMemoryServiceNotificationsSubscription

    constructor(
        private _inMemoryDataService: InMemoryDataService) { }

    ngOnInit() {

        // InMemoryDataService
        this.inMemoryServiceNotifications = this._inMemoryDataService.getNotificationGenerator()
        this.inMemoryServiceNotificationsSubscription = this.inMemoryServiceNotifications.subscribe(
            (msg) => { this.logMessageFunc(this._inMemoryDataService.name(), msg) },
            (err) => { this.logErrorFunc(this._inMemoryDataService.name(), err) },
            ()    => { this.logCompletedFunc(this._inMemoryDataService.name())}
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