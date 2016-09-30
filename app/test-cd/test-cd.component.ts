import {Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

import {TestCdService, FakeObject} from './test-cd.service'
import * as UUID from '../util/uuid'

import { remote, ipcRenderer } from 'electron';

@Component({
  moduleId: module.id,
  selector: 'test-cd',
  templateUrl: 'test-cd.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TestCdComponent implements OnInit {
  loadingMessage: any;
  message: string
  fakeObjects: any

  private memoryEvents: Observable<string>;
  private memoryEventsSubscription;

  constructor(private _testService: TestCdService,
              private _cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.loadingMessage = Observable.of(true).delay(2000);
    this.message = "Inicio"

    ipcRenderer.on('save-file', this.changeMessage);

    this.fakeObjects = new Array()
    //this.fakeObjects.push( Observable.of(new FakeObject("","")).delay(3000))

    this.memoryEvents = this._testService.getEventEmitter()
    this.memoryEventsSubscription = this.memoryEvents.subscribe(
        this.defaultWsMessage,
        this.defaultWsError,
        this.defaultWsCompleted
    );
  }

  changeMessage = () => {
      this.message = "IPC Fuck you"
      console.log(this.message)
      this._cdr.markForCheck();
      this._cdr.detectChanges();
  }

  defaultWsMessage = (msg:string) =>{
        this.loadingMessage = UUID.randomUUID()
        this._cdr.markForCheck()
    }

    defaultWsError = (err) => {
        console.log('Error logeado por mi: ' + err);
    }

    defaultWsCompleted = () => {
        console.log('Completed');
    }
}