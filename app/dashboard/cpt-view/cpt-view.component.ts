import { Component, OnInit } from '@angular/core';
import { ExecutionResult } from '../../model/executionResult'
import { Cpt } from '../../model/bayesianNetwork/cpt/cpt'

import { StreamListOutputService, StreamListEvent, StreamListEventType } from '../../stream-list/stream-list-output.service'

import {Observable} from 'rxjs/Observable'

@Component({
    moduleId: module.id,
    selector: 'cpt-view',
    templateUrl: 'cpt-view.component.html',
	styleUrls: ['cpt-view.component.css']
})
export class CptViewComponent implements OnInit {

	private cptsLoaded: boolean = false
	private selectedCptUniqueId: string = ""

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

	selectCpt(cpt: Cpt, $event: MouseEvent){
		this.selectedCptUniqueId = cpt.uniqueId
	}

	isCptSelected(cpt: Cpt): boolean{
		if(cpt.uniqueId === this.selectedCptUniqueId)
			return true;
		return false;
	}

     private manageStreamListEvent(event: StreamListEvent){

		switch(event.type){
			case StreamListEventType.EXECUTION_RESULT_SELECTED: this.newSelectedResultEvent(event.content); break;
			case StreamListEventType.EXECUTION_RESULT_DELETED: this.newDeletedResultEvent(event.content); break;
			case StreamListEventType.STREAM_DELETED: this.newDeletedStreamEvent(event.content); break;
		}

	}

     private newSelectedResultEvent(result: ExecutionResult){
         if(this.selectedResult === void 0 || this.selectedResult.getId() !== result.getId()){
			this.selectedResult = result;
			this.cptsLoaded = true;
			this.selectedCptUniqueId = result.bayesianNetwork.cpts[0].uniqueId
		}
     }

    private newDeletedResultEvent(resultId: string){
		if(this.selectedResult === void 0 || this.selectedResult.getId() === resultId){
			this.cptsLoaded = false;
			this.selectedCptUniqueId = "";
		}
	}

	private newDeletedStreamEvent(streamId: string){
		if(this.selectedResult === void 0 || this.selectedResult.streamId === streamId){
			this.cptsLoaded = false;
			this.selectedCptUniqueId = "";
		}
	}

}