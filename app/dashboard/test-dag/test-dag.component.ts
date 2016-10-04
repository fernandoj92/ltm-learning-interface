import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

import * as d3 from 'd3'

@Component({
    moduleId: module.id,
    selector: 'test-dag',
    templateUrl: 'test-dag.component.html'
})
export class TestDagComponent implements OnInit {

    @ViewChild('test') test

    constructor(private eltRef:ElementRef) {}

    ngAfterViewInit() {
        /*
        let chart = d3.select(this.eltRef.nativeElement)
        .select('.chart')
        .append("g")
        .append("rect")
            .attr("width", 50)
            .attr("height", 100);
        */
        
        let test = d3.select(this.test.nativeElement)
        .append("g")
        .append("rect")
            .attr("width", 50)
            .attr("height", 100);
        
    }

    ngOnInit() { 
        let numbers: number[] = [1,2,3,4];
        let data = [
            { date: '2014-01-01', amount: 10 },
            { date: '2014-02-01', amount: 20 },
            { date: '2014-03-01', amount: 40 },
            { date: '2014-04-01', amount: 80 }
        ];

        console.log(d3.max(numbers));
        console.log(d3.min(data.map(x =>x.date)));
        
    }
}