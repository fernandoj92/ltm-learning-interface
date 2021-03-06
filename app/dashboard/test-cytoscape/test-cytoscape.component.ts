import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ExecutionResult } from '../../model/executionResult'
import { CytoscapeDag } from './model/cytoscapeDag'
import { StreamListOutputService, StreamListEvent, StreamListEventType } from '../../stream-list/stream-list-output.service'

import {Observable} from 'rxjs/Observable'

declare var cytoscape: any;

// TODO: Each updateDagView needs to transform the Dag into a cytoscapeDag, then to a string and then to a JSON object
// TODO: The number of attributes, LVs and other relevant information should be visible inside the layout or in a child component
// TODO: Properly update the view when a related stream/result is deleted, modified

@Component({
    moduleId: module.id,
    selector: 'test-cytoscape',
    templateUrl: 'test-cytoscape.component.html',
    styleUrls: ['test-cytoscape.component.css']
})
export class TestCytoscapeComponent implements OnInit {

    @ViewChild('test') test;
	dagLoaded: boolean = false;

	private streamListEvents: Observable<StreamListEvent>;
	private streamListEventsSubscription;
	private selectedResult: ExecutionResult;

	private cyDag

    constructor(private _streamListOutputService: StreamListOutputService,
				private eltRef:ElementRef) {
		this.selectedResult = void 0;
	}

	ngOnInit() {
		this.streamListEvents = this._streamListOutputService.getStreamListEventEmitter();
		this.streamListEventsSubscription = this.streamListEvents.subscribe(
            (event) => this.manageStreamListEvent(event),
            (err) => { console.log("There was an error with the streamList event emission") }
        );
	 }

    ngAfterViewInit() {


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
			this.dagLoaded = true;
			this.selectedResult = result
			this.updateDagView()
		}
		console.log('selected result: '+ result.getId())
	}

	private newDeletedResultEvent(resultId: string){
		if(this.selectedResult === void 0 || this.selectedResult.getId() === resultId){
			this.dagLoaded = false
			if(this.cyDag !== void 0)
				this.cyDag.destroy()
		}
			
	}

	private newDeletedStreamEvent(streamId: string){
		if(this.selectedResult === void 0 || this.selectedResult.streamId === streamId){
			this.dagLoaded = false
			if(this.cyDag !== void 0)
				this.cyDag.destroy()
		}
			
	}

	private updateDagView(){

		this.cyDag = new cytoscape({
					container: this.test.nativeElement,
                    boxSelectionEnabled: false,
                    autounselectify: true,
					layout: {
						name: 'dagre'
					},
					style: [
						{
							selector: 'node',
							style: {
								'content': 'data(id)',
								'text-opacity': 0.5,
								'text-valign': 'center',
								'text-halign': 'right',
								'background-color': '#11479e'
							}
						},
						{
							selector: 'edge',
							style: {
								'width': 4,
								'target-arrow-shape': 'triangle',
								'line-color': '#9dbaea',
								'target-arrow-color': '#9dbaea',
								'curve-style': 'bezier'
							}
						}
					],
					elements: JSON.parse(JSON.stringify(new CytoscapeDag(this.selectedResult.bayesianNetwork.dag))),
				});
	}
}