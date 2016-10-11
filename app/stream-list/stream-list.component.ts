import { Component, OnInit, Input, ChangeDetectorRef, ChangeDetectionStrategy, ViewChild, ViewEncapsulation } from '@angular/core';

import { IdCollection } from '../model/abstract/IdCollection' 
import { Stream } from '../model/stream'
import { ExecutionResult } from '../model/executionResult'
import { InMemoryDataService } from '../services/storage/in-memory-data.service'
import * as UUID from '../util/uuid'
import { IContextMenuLinkConfig } from '../contextmenu/contextmenu-linkconfig'

import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import {Observable} from 'rxjs/Observable'
import {Subject} from 'rxjs/Subject'

@Component({
    moduleId: module.id,
    selector: 'stream-list',
    templateUrl: 'stream-list.component.html',
    styleUrls:['stream-list.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush, 
    encapsulation: ViewEncapsulation.None
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
    rightClickedStream: Stream
    rightClickedResult: ExecutionResult

    // Modal windows
    @ViewChild('deleteStreamModal') deleteStreamModal: ModalComponent
    @ViewChild('renameStreamModal') renameStreamModal: ModalComponent
    // Modal window options
    animation: boolean = true;
    keyboard: boolean = true;
    backdrop: string = 'static';
    cssClass: string = '';
    css: boolean = false;

    constructor(
        private _inMemoryDataService: InMemoryDataService,
        private _cdr: ChangeDetectorRef) {
            
        // Initialization of the rightClickedStream
        this.rightClickedStream = new Stream(null, 'none', 'none', new Date())
        // Initialization of the rightClickedResult
        this.rightClickedResult = new ExecutionResult('none', null, 'none', -1, -1, -1)

        this.streamItemMenu  = [
            {title:'Rename', click: (item, $event) => {
                    this.renameStreamModal.open();
                    this.rightClickedStream = item;
                    this.updateView();
                }
            },
            {title:'Delete', click: (item, $event) =>{ 
                    this.deleteStreamModal.open();
                    this.rightClickedStream =  item;
                    this.updateView();
                }
            },
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

    private updateView(){
        this._cdr.markForCheck();
        this._cdr.detectChanges(); 
     }

     private newMemoryEvent = (msg) => {
        // Update the view to show the memory update
        console.log("newMemoryEvent received: "+ msg)
        this.updateView()
     }


     private deleteRightClickedStream(){
         this.streams.remove(this.rightClickedStream.getId())
         // Not neccesary to update the view because
     }

     private renameRightClickedStream(){
         this.updateView()
     }

     private streamRenameAction = (stream: Stream, $event?: MouseEvent) => {
        alert("streamRenameAction sobre "+ stream.getId())
     }

     /*private streamDeleteAction = (stream: Stream, $event?: MouseEvent) => {
         this.deleteStreamModal.open()
     }*/

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
