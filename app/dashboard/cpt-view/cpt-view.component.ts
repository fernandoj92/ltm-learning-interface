import { Component, OnInit } from '@angular/core';
import { ExecutionResult } from '../../model/executionResult'
import { StreamListOutputService, StreamListEvent, StreamListEventType } from '../../stream-list/stream-list-output.service'

import {Observable} from 'rxjs/Observable'

@Component({
    moduleId: module.id,
    selector: 'cpt-view',
    templateUrl: 'cpt-view.component.html'
})
export class CptViewComponent implements OnInit {

	private streamListEvents: Observable<StreamListEvent>;
	private streamListEventsSubscription;
	private selectedResult: ExecutionResult;

    constructor(private _streamListOutputService: StreamListOutputService) { }

	ngOnInit() {
		this.streamListEvents = this._streamListOutputService.getStreamListEventEmitter();
		this.streamListEventsSubscription = this.streamListEvents.subscribe(
            (event) => this.manageStreamListEvent(event),
            (err) => { console.log("There was an error with the streamList event emission") }
        );
	 }

     private manageStreamListEvent(event: StreamListEvent){

		switch(event.type){
			case StreamListEventType.EXECUTION_RESULT_SELECTED: this.newSelectedResultEvent(event.content)
			case StreamListEventType.EXECUTION_RESULT_DELETED: this.newDeletedResultEvent(event.content)
			case StreamListEventType.STREAM_DELETED: this.newDeletedStreamEvent(event.content)
		}

	}

     private newSelectedResultEvent(result: ExecutionResult){
         if(this.selectedResult === void 0 || this.selectedResult.getId() !== result.getId()){
			this.selectedResult = result
			//this.updateCptView()
			console.log('dag view updated')
		}
     }

    private newDeletedResultEvent(resultId: string){

	}

	private newDeletedStreamEvent(streamId: string){

	}

     private updateCptView(){

     }
}