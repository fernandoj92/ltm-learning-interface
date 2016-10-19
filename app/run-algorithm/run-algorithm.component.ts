import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RunAlgorithmService } from './run-algorithm.service'
import { AvailableAlgorithms } from '../model/algorithms/availableAlgorithms'

import {Observable} from 'rxjs/Observable'
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

@Component({
    moduleId: module.id,
    selector: 'run-algorithm',
    templateUrl: 'run-algorithm.component.html',
	styleUrls: ['run-algorithm.component.css']
})
export class RunAlgorithmComponent implements OnInit {

    private showRunAlgorithmModalEvents: Observable<AvailableAlgorithms>
    private showRunAlgorithmModalEventsSubscription

    // Modal windows
    @ViewChild('runABIModal') runABIModal: ModalComponent;
    @ViewChild('runSALLModal') runSALLModal: ModalComponent;
    // Modal window options
    animation: boolean = true;
    keyboard: boolean = true;
    backdrop: string = 'static';
    cssClass: string = '';
    css: boolean = false;
    // Modal execute forms
    runABIForm: RunABIForm
    runSALLForm: RunSALLForm

    constructor(private _runAlgorithmService: RunAlgorithmService) { }

	ngOnInit() {
		this.showRunAlgorithmModalEvents = this._runAlgorithmService.getShowRunAlgorithmModalEvents();
		this.showRunAlgorithmModalEventsSubscription = this.showRunAlgorithmModalEvents.subscribe(
            (algorithm) => this.showModal(algorithm),
            (err) => { console.log("There was an error with the runAlgorithmShowModal event emission") }
        );

        // Initialize Run ABI forms
        this.runABIForm = {
            selectedFile: '',
            fssMeasure: '',
            maxIslandSize: 5,
            baseLvCardinality: 2,
            udTestThreshold: 3.0,
            batchSize: 1000
        }
	}

    executeABI(): void{
        this.runABIModal.close();
        this._runAlgorithmService.executeABI();
    }

    executeSALL(): void {
        this.runSALLModal.close();
        this._runAlgorithmService.executeSALL();
    }

    private showModal(algorithm: AvailableAlgorithms): void {
        switch(algorithm){
            case AvailableAlgorithms.ABI: this.showABIModal(); break;
            case AvailableAlgorithms.SALL: this.showSALLModal(); break;
        }
    }

    private showABIModal(): void {
        this.runABIModal.open();
    }

    private showSALLModal(): void {
        this.runSALLModal.open();
    }

}

export interface RunABIForm {
    selectedFile: string;
    fssMeasure: string;
    maxIslandSize: number;
    baseLvCardinality: number;
    udTestThreshold: number;
    batchSize: number;
}

export class RunSALLForm{
    //TODO
}