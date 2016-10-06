import { Component, OnInit, Input, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';

import { IdCollection } from '../model/abstract/IdCollection' 
import { Stream } from '../model/stream'
import { ExecutionResult } from '../model/executionResult'
import { InMemoryDataService } from '../services/storage/in-memory-data.service'
import * as UUID from '../util/uuid'

import {Observable} from 'rxjs/Observable'
import {Subject} from 'rxjs/Subject'

@Component({
    moduleId: module.id,
    selector: 'stream-list',
    templateUrl: 'stream-list.component.html',
    styleUrls:['stream-list.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class StreamListComponent implements OnInit {
    
    private memoryEvents: Observable<string>;
    private memoryEventsSubscription;

    // View properties
    title: string = "Your Streams";
    @Input() streams: IdCollection<Stream>;
    streamItemMenu: any
    resultItemMenu: any

    constructor(
        private _inMemoryDataService: InMemoryDataService,
        private _cdr: ChangeDetectorRef) {
        this.streamItemMenu = [
            {title:'Rename',subject:new Subject<string>()},
            {title:'Delete',subject:new Subject<string>()},
            {title:'Run',subject:new Subject<string>()},
            {title:'Properties',subject:new Subject<string>()}
        ];
        this.resultItemMenu = [
            {title:'Export',subject:new Subject<string>()},
            {title:'Delete',subject:new Subject<string>()},
            {title:'Properties',subject:new Subject<string>()}
        ];
        }

    ngOnInit() {
        // Get the streams' object reference from the memory service
        this.streams = this._inMemoryDataService.getStreamsReference()
        // Subscribe to its contextmenu actions
        this.streamItemMenu.forEach(item => 
            item.subject.subscribe(actionTitle=> this.streamItemMenuActions(actionTitle)));
        this.resultItemMenu.forEach(item => 
            item.subject.subscribe(actionTitle=> this.resultItemMenuActions(actionTitle)))
        // Subscribe to the memory event emitter to know when a change in the model has ocurred (update the view)
        this.memoryEvents = this._inMemoryDataService.getStreamsEventEmitter()
        this.memoryEventsSubscription = this.memoryEvents.subscribe(
            (msg) => this.newMemoryEvent(msg),
            (err) => { console.log("There was an error with the memory event emission") }
        );
     }

     private streamItemMenuActions(actionTitle:string){
        switch(actionTitle){
            case 'Rename': this.streamRenameAction();
            case 'Delete': this.streamDeleteAction();
            case 'Run': this.streamRunAction();
            case 'Properties': this.streamPropertiesAction();
        }
     }

     private resultItemMenuActions(actionTitle:string){
        switch(actionTitle){
            case 'Export': this.resultExportAction();
            case 'Delete': this.resultmDeleteAction();
            case 'Properties': this.resultPropertiesAction();
        }
     }

     private newMemoryEvent = (msg) => {
        // Update the view to show the memory update
        console.log("newMemoryEvent received: "+ msg)
        this._cdr.markForCheck();
        this._cdr.detectChanges(); 
     }

     private streamRenameAction = () => {
        alert("streamRenameAction")
     }

     private streamDeleteAction = () => {
         
     }

     private streamRunAction = () => {
         
     }

     private streamPropertiesAction = () => {
         
     }

     private resultExportAction = () => {
         alert("resultExportAction")
     }

     private resultmDeleteAction = () => {
         
     }

     private resultPropertiesAction = () => {

     }
}
