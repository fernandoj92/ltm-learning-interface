import { Component, OnInit, Input, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';

import { IdCollection } from '../model/abstract/IdCollection' 
import { Stream } from '../model/stream'
import { ExecutionResult } from '../model/executionResult'
import { InMemoryDataService } from '../services/storage/in-memory-data.service'
import * as UUID from '../util/uuid'


import {Observable} from 'rxjs/Observable'

@Component({
    moduleId: module.id,
    selector: 'stream-list',
    templateUrl: 'stream-list.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class StreamListComponent implements OnInit {
    private memoryEvents: Observable<string>;
    private memoryEventsSubscription;
    @Input()
    streams: IdCollection<Stream>;
    title: string = "Your Streams";


    constructor(
        private _inMemoryDataService: InMemoryDataService,
        private _cdr: ChangeDetectorRef) {}

    ngOnInit() {
        this.streams = this._inMemoryDataService.getStreamsReference()

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
}
