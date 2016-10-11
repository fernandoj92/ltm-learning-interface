import { Injectable } from '@angular/core';
import { ExecutionResult } from '../model/executionResult'
import { Subject } from 'rxjs/Subject'
import { Observable } from 'rxjs/Observable'

@Injectable()
export class StreamListOutputService {

    private streamListEventEmitter: Subject<StreamListEvent>

    constructor() {
        this.streamListEventEmitter = new Subject()
     }

    public getStreamListEventEmitter(): Observable<StreamListEvent>{
        return this.streamListEventEmitter.asObservable();
    }

    public selectResultEvent(result: ExecutionResult): void {
        this.streamListEventEmitter.next(
            new StreamListEvent( StreamListEventType.EXECUTION_RESULT_SELECTED, result)
        )
        //this.selectedResultEventEmitter.next(result)
    }

    public deleteResultEvent(resultId: string): void {
        this.streamListEventEmitter.next(
            new StreamListEvent( StreamListEventType.EXECUTION_RESULT_DELETED, resultId)
        );
    }

    public deleteStreamEvent(streamId: string): void {
        this.streamListEventEmitter.next(
            new StreamListEvent(StreamListEventType.STREAM_DELETED, streamId)
        );
    }
}

export class StreamListEvent{
    type: StreamListEventType
    content: any

    constructor(type: StreamListEventType, content: any){
        this.type = type;
        this.content = content;
    }
}

export enum StreamListEventType{
    EXECUTION_RESULT_SELECTED,
    EXECUTION_RESULT_DELETED,
    STREAM_DELETED
}