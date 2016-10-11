import { Injectable } from '@angular/core';
import { ExecutionResult } from '../model/executionResult'
import { Subject } from 'rxjs/Subject'
import { Observable } from 'rxjs/Observable'

@Injectable()
export class StreamListOutputService {

    private selectedResultEventEmitter: Subject<ExecutionResult>

    constructor() {
        this.selectedResultEventEmitter = new Subject()
     }

    public getSelectedResultEventEmitter(): Observable<ExecutionResult>{
        return this.selectedResultEventEmitter.asObservable();
    }

    public selectResultEvent(result: ExecutionResult): void {
        this.selectedResultEventEmitter.next(result)
    }
}