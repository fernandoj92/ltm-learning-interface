import { Injectable } from '@angular/core';

import * as UUID from '../util/uuid'

import {Subject} from 'rxjs/Subject'
import {Observable} from 'rxjs/Observable'

import { remote, ipcRenderer } from 'electron';

@Injectable()
export class TestCdService {

    private events: Subject<string>
    private fakeObjects: FakeObject[]

    constructor() {
        this.fakeObjects =  new Array()
        ipcRenderer.on('open-file', this.sendTestMsg);
     }

    public getObjReference(): FakeObject[]{ return this.fakeObjects }

    public getEventEmitter(): Observable<string>{
       if(!this.events)
            this.events = new Subject<string>();

       return this.events.asObservable()
    }

    private sendTestMsg = () => {
        this.events.next("test-msg");
    }

    private addFakeObject = (event,jsonContent) =>{
        this.fakeObjects.push(new FakeObject("fakeObj", UUID.randomUUID()))
    }
}

export class FakeObject{
    name: string
    id: string

    constructor(name: string, id: string){
        this.name = name
        this.id = id
    }
}