import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { RunAlgorithmService } from '../run-algorithm.service'
import { SALLParameters } from '../../model/algorithms/availableAlgorithms'

import {Observable} from 'rxjs/Observable'
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { CustomValidators } from 'ng2-validation';

@Component({
    moduleId: module.id,
    selector: 'run-sall',
    templateUrl: 'run-sall.component.html',
	styleUrls: ['run-sall.component.css']
})
export class RunSALLComponent implements OnInit{

    private showRunSALLModalEvents: Observable<string>
    private showRunSALLModalEventsSubscription

    // Modal windows
    @ViewChild('runSALLModal') runSALLModal: ModalComponent;
    // Modal window options
    animation: boolean = true;
    keyboard: boolean = true;
    backdrop: string = 'static';
    cssClass: string = '';
    css: boolean = false;
    // Modal execute form
    runSALLForm: FormGroup;
    // SALL Parameters
    sallParameters: SALLParameters
    availableDataFiles = []

    constructor(
        private fb: FormBuilder,
        private _runAlgorithmService: RunAlgorithmService) { }

    ngOnInit() {
		this.showRunSALLModalEvents = this._runAlgorithmService.getShowRunSALLModalEvents();
		this.showRunSALLModalEventsSubscription = this.showRunSALLModalEvents.subscribe(
            (msg) => this.showModal(),
            (err) => { console.log("There was an error with the runAlgorithmShowModal event emission") }
        );

        // Initialize the ABI parameters 
        this.sallParameters = {
        }

        this.buildForm();
	}

    showModal(){
        this.runSALLModal.open()
    }

    executeSALL(){
        this.runSALLModal.close();
        this._runAlgorithmService.executeSALL();
    }

    buildForm(){

    }
}