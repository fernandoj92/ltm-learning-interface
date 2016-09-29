import { Component, OnInit } from '@angular/core';

import { Stream } from '../model/stream'
import { ExecutionResult } from '../model/executionResult'

import { InMemoryDataService } from '../services/storage/in-memory-data.service'

@Component({
    moduleId: module.id,
    selector: 'stream-list',
    templateUrl: 'stream-list.component.html'
})
export class StreamListComponent implements OnInit {

    streams: Stream[]
    title: string = 'Your Streams'

    constructor(
        private inMemoryDataService: InMemoryDataService) {}

    ngOnInit() {
        this.streams = this.inMemoryDataService.getStreamsReference()
     }
}