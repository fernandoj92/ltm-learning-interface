import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ExecutionResult } from '../../model/executionResult'
import { StreamListOutputService } from '../../stream-list/stream-list-output.service'
import {Observable} from 'rxjs/Observable'

declare var cytoscape: any;

@Component({
    moduleId: module.id,
    selector: 'test-cytoscape',
    templateUrl: 'test-cytoscape.component.html',
    styleUrls: ['test-cytoscape.component.css']
})
export class TestCytoscapeComponent implements OnInit {

    @ViewChild('test') test;

	private selectedResultEvents: Observable<ExecutionResult>;
	private selectedResultEventsSubscription;
	private selectedResult: ExecutionResult;

    constructor(private _streamListOutputService: StreamListOutputService,
				private eltRef:ElementRef) {
		this.selectedResult = void 0;
	}

	ngOnInit() {
		this.selectedResultEvents = this._streamListOutputService.getSelectedResultEventEmitter();
		this.selectedResultEventsSubscription = this.selectedResultEvents.subscribe(
            (result) => this.newSelectedResultEvent(result),
            (err) => { console.log("There was an error with the selectedResult event emission") }
        );
	 }

    ngAfterViewInit() {

        let cy = new cytoscape({
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
					elements: {
						nodes: [
							{ data: { id: 'n0' } },
							{ data: { id: 'n1' } },
							{ data: { id: 'n2' } },
							{ data: { id: 'n3' } },
							{ data: { id: 'n4' } },
							{ data: { id: 'n5' } },
							{ data: { id: 'n6' } },
							{ data: { id: 'n7' } },
							{ data: { id: 'n8' } },
							{ data: { id: 'n9' } },
							{ data: { id: 'n10' } },
							{ data: { id: 'n11' } },
							{ data: { id: 'n12' } },
							{ data: { id: 'n13' } },
							{ data: { id: 'n14' } },
							{ data: { id: 'n15' } },
							{ data: { id: 'n16' } }
						],
						edges: [
							{ data: { source: 'n0', target: 'n1' } },
							{ data: { source: 'n1', target: 'n2' } },
							{ data: { source: 'n1', target: 'n3' } },
							{ data: { source: 'n4', target: 'n5' } },
							{ data: { source: 'n4', target: 'n6' } },
							{ data: { source: 'n6', target: 'n7' } },
							{ data: { source: 'n6', target: 'n8' } },
							{ data: { source: 'n8', target: 'n9' } },
							{ data: { source: 'n8', target: 'n10' } },
							{ data: { source: 'n11', target: 'n12' } },
							{ data: { source: 'n12', target: 'n13' } },
							{ data: { source: 'n13', target: 'n14' } },
							{ data: { source: 'n13', target: 'n15' } },
						]
					},
				});
    }

	private newSelectedResultEvent(result: ExecutionResult){
		if(this.selectedResult === void 0 || this.selectedResult.getId() !== result.getId())
			this.selectedResult = result
		console.log('selected result: '+ result.getId())
	}
}