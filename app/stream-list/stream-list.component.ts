import { Component, OnInit } from '@angular/core';

import { Stream } from '../model/stream'
import { ExecutionResult } from '../model/executionResult'

@Component({
    moduleId: module.id,
    selector: 'stream-list',
    templateUrl: 'stream-list.component.html'
})
export class StreamListComponent implements OnInit {

    streams: Stream[]


    constructor() { }

    ngOnInit() {

     }
}