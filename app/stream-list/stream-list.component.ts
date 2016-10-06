import { Component, OnInit, Input, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';

import { IdCollection } from '../model/abstract/IdCollection' 
import { Stream } from '../model/stream'
import { ExecutionResult } from '../model/executionResult'
import { InMemoryDataService } from '../services/storage/in-memory-data.service'
import * as UUID from '../util/uuid'
import { IContextMenuLinkConfig } from '../contextmenu/contextmenu-linkconfig'

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
    // Context menus
    streamItemMenu: IContextMenuLinkConfig[]
    resultItemMenu: IContextMenuLinkConfig[]

    constructor(
        private _inMemoryDataService: InMemoryDataService,
        private _cdr: ChangeDetectorRef) {
        this.streamItemMenu  = [
            {title:'Rename', click: (item, $event) => this.streamRenameAction(item, $event)},
            {title:'Delete', click: (item, $event) => this.streamDeleteAction(item, $event)},
            {title:'Run', click: (item, $event) => this.streamRunAction(item, $event)},
            {title:'Properties', click: (item, $event) => this.streamPropertiesAction(item, $event)}
        ];
        this.resultItemMenu = [
            {title:'Export', click: (item, $event) => this.resultExportAction(item, $event)},
            {title:'Delete', click: (item, $event) => this.resultmDeleteAction(item, $event)},
            {title:'Properties', click: (item, $event) => this.resultPropertiesAction(item, $event)}
        ];
        }

    ngOnInit() {
        // Get the streams' object reference from the memory service
        this.streams = this._inMemoryDataService.getStreamsReference()

        // Subscribe to the memory event emitter to know when a change in the model has ocurred (update the view)
        this.memoryEvents = this._inMemoryDataService.getStreamsEventEmitter()
        this.memoryEventsSubscription = this.memoryEvents.subscribe(
            (msg) => this.newMemoryEvent(msg),
            (err) => { console.log("There was an error with the memory event emission") }
        );
     }

     private newMemoryEvent = (msg) => {
        // Update the view to show the memory update
        console.log("newMemoryEvent received: "+ msg)
        this._cdr.markForCheck();
        this._cdr.detectChanges(); 
     }

     private streamRenameAction = (stream: Stream, $event?: MouseEvent) => {
        alert("streamRenameAction sobre "+ stream.getId())
     }

     private streamDeleteAction = (stream: Stream, $event?: MouseEvent) => {
         
     }

     private streamRunAction = (stream: Stream, $event?: MouseEvent) => {
         
     }

     private streamPropertiesAction = (stream: Stream, $event?: MouseEvent) => {
         
     }

     private resultExportAction = (result: ExecutionResult, $event?: MouseEvent) => {
         alert("resultExportAction sobre "+ result.getId())
     }

     private resultmDeleteAction = (result: ExecutionResult, $event?: MouseEvent) => {
         
     }

     private resultPropertiesAction = (result: ExecutionResult, $event?: MouseEvent) => {

     }
}
