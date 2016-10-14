import { Component, OnInit, Input, ChangeDetectorRef, ChangeDetectionStrategy, ViewChild, ViewEncapsulation } from '@angular/core';

// Utils
import { IdCollection } from '../model/abstract/idCollection'
import * as UUID from '../util/uuid' 
import { IContextMenuLinkConfig } from '../contextmenu/contextmenu-linkconfig'
// Model
import { Stream } from '../model/stream'
import { ExecutionResult } from '../model/executionResult'
// Services
import { InMemoryDataService } from '../services/storage/in-memory-data.service'
import { StreamListOutputService } from './stream-list-output.service'

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
    
    // Memory events
    private memoryEvents: Observable<string>;
    private memoryEventsSubscription;

    // Communication channel with the dag-view and cpt-view components
    private selectedResult: ExecutionResult;

    // View properties
    title: string = "Your Streams";
    @Input() streams: IdCollection<Stream>;

    // Context menus
    streamItemMenu: IContextMenuLinkConfig[];
    resultItemMenu: IContextMenuLinkConfig[];
    rightClickedStream: Stream;
    rightClickedResult: ExecutionResult;

    // Modal windows
    @ViewChild('deleteStreamModal') deleteStreamModal: ModalComponent;
    @ViewChild('renameStreamModal') renameStreamModal: ModalComponent;
    @ViewChild('propertiesStreamModal') propertiesStreamModal: ModalComponent;
    @ViewChild('exportStreamModal') exportStreamModal: ModalComponent;
    @ViewChild('deleteResultModal') deleteResultModal: ModalComponent;
    @ViewChild('propertiesResultModal') propertiesResultModal: ModalComponent;
    @ViewChild('exportResultModal') exportResultModal: ModalComponent;
    // Modal window options
    animation: boolean = true;
    keyboard: boolean = true;
    backdrop: string = 'static';
    cssClass: string = '';
    css: boolean = false;
    // Modal export forms
    availableExportFormats: Array<string> =["json"]
    exportResultForm: ExportResultForm
    exportStreamForm: ExportStreamForm

    constructor(
        private _inMemoryDataService: InMemoryDataService,
        private _streamListOutputService: StreamListOutputService,
        private _cdr: ChangeDetectorRef) {
        
        // Get the streams' object reference from the memory service
        this.streams = this._inMemoryDataService.getStreamsReference()
        // Initialization of the rightClickedStream
        this.rightClickedStream = new Stream(new IdCollection<ExecutionResult>(), 'none', 'none', new Date())
        // Initialization of the rightClickedResult
        this.rightClickedResult = new ExecutionResult('none', null, 'none', -1, -1, -1)
        // Initialization of the  exportResult form
        this.exportResultForm = new ExportResultForm(this.availableExportFormats[0], false)
        // Initialization of the  exportStream form
        this.exportStreamForm = new ExportStreamForm(this.availableExportFormats[0])
        }

    ngOnInit() {

        this.streamItemMenu  = [
            {title:'Rename', click: (item, $event) => {
                    this.renameStreamModal.open();
                    this.rightClickedStream = item;
                    this.updateView();
                }
            },
            {title:'Export', click: (item, $event) => {
                    this.exportStreamModal.open();
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
            {title:'Properties', click: (item, $event) => {
                    this.propertiesStreamModal.open();
                    this.rightClickedStream = item;
                    this.updateView();
                }
            }
        ];

        this.resultItemMenu = [
            {title:'Export', click: (item, $event) => {
                    this.exportResultModal.open();
                    this.rightClickedResult = item;
                    this.updateView();
                }
            },
            {title:'Delete', click: (item, $event) => {
                    this.deleteResultModal.open();
                    this.rightClickedResult = item;
                    this.updateView();
                }
            },
            {title:'Properties', click: (item, $event) => {
                    this.propertiesResultModal.open();
                    this.rightClickedResult = item;
                    this.updateView();
                }
            }
        ];

        // Subscribe to the memory event emitter to know when a change in the model has ocurred (update the view)
        this.memoryEvents = this._inMemoryDataService.getStreamsEventEmitter()
        this.memoryEventsSubscription = this.memoryEvents.subscribe(
            (msg) => this.newMemoryEvent(msg),
            (err) => { console.log("There was an error with the memory event emission") }
        );
     }

    deleteRightClickedStream(){
         let streamId = this.rightClickedStream.getId()
         this.streams.remove(streamId)
         this._streamListOutputService.deleteStreamEvent(streamId)
         // Not neccesary to update the view because it will generate a memory event????????
         this.updateView()
    }

    renameRightClickedStream(){
        this.updateView()
    }

    selectExecutionResult(result: ExecutionResult, $event: MouseEvent){
        this.selectedResult = result;
        // Avisar correctamente a los componentes relaccionados
        this._streamListOutputService.selectResultEvent(this.selectedResult)
    }

    deleteRightClickedResult(){
        let resultId = this.rightClickedResult.getId()
        this.streams.get(this.rightClickedResult.streamId).remove(this.rightClickedResult)
        // Avisar correctamente a los componentes relaccionados
        this._streamListOutputService.deleteResultEvent(resultId)
    }

    exportRightClickedResult(){
        this._inMemoryDataService.exportExecutionResult(
            ExecutionResult.copy(this.rightClickedResult), 
            this.exportResultForm.format, 
            this.exportResultForm.includeStreamId);
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
}

class ExportStreamForm{
    format: string

    constructor(format: string){
        this.format = format;
    }
}

class ExportResultForm{
    format: string
    includeStreamId: boolean

    constructor(format: string, includeStreamId: boolean){
        this.format = format
        this.includeStreamId = includeStreamId
    }
}
