import { Component, OnInit, Input, ChangeDetectorRef,ChangeDetectionStrategy } from '@angular/core';

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
    streams: Stream[];
    fakeStreams: FakeStream[];
    title: string = "Your Streams";


    constructor(
        private _inMemoryDataService: InMemoryDataService,
        private _cdr: ChangeDetectorRef) {}

    ngOnInit() {
        this.streams = this._inMemoryDataService.getStreamsReference()
        this.fakeStreams = new Array()

        this.memoryEvents = this._inMemoryDataService.getStreamsEventEmitter()
        this.memoryEventsSubscription = this.memoryEvents.subscribe(
            this.changeTitle,
            (err) => { console.log("There was an error with the memory event emission")},
            ()    => { }
        );
     }

     testMsg = (msg) => {
        //this.streams = this._inMemoryDataService.getStreamsReference()
        this.fakeStreams.push(new FakeStream("fake", UUID.randomUUID()))
        console.log(this.fakeStreams.length)
        this.title = UUID.randomUUID();
        this._cdr.markForCheck();
        this._cdr.detectChanges();
     }

     changeTitle = (msg) => {
         this.title = UUID.randomUUID();
         this._cdr.markForCheck();
         this._cdr.detectChanges();
         //this.fakeStreams.push(new FakeStream("fake", UUID.randomUUID()))
     }


}

export class FakeStream{
    name: string
    id: string

    constructor(name: string, id: string){
        this.name = name
        this.id = id
    }
}