import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

declare var cytoscape: any;

@Component({
    moduleId: module.id,
    selector: 'test-cytoscape',
    templateUrl: 'test-cytoscape.component.html'
})
export class TestCytoscapeComponent implements OnInit {

    @ViewChild('test') test

    constructor(private eltRef:ElementRef) {}

    ngAfterViewInit() {

        let cy = cytoscape({
            container: this.test.nativeElement,
            elements: [ // list of graph elements to start with
                { data: { id: 'a' } },
                { data: { id: 'b' } },
                { data: { id: 'ab', source: 'a', target: 'b' } }
            ],

            style: [ // the stylesheet for the graph
                {
                    selector: 'node',
                    style: {
                        'background-color': '#666',
                        'label': 'data(id)'
                    }
                },
                {
                    selector: 'edge',
                    style: {
                        'width': 3,
                        'line-color': '#ccc',
                        'target-arrow-color': '#ccc',
                        'target-arrow-shape': 'triangle'
                    }
                }
            ],

            layout: {
                name: 'grid',
                rows: 1
            }
        })
    }

    ngOnInit() { }
}