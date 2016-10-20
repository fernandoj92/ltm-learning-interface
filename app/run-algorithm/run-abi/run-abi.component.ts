import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { RunAlgorithmService } from '../run-algorithm.service'
import { ABIParameters } from '../../model/algorithms/availableAlgorithms'

import {Observable} from 'rxjs/Observable'
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { CustomValidators } from 'ng2-validation';

@Component({
    moduleId: module.id,
    selector: 'run-abi',
    templateUrl: 'run-abi.component.html',
	styleUrls: ['run-abi.component.css']
})
export class RunABIComponent implements OnInit{

    private showRunABIModalEvents: Observable<string>
    private showRunABIModalEventsSubscription

    // Modal windows
    @ViewChild('runABIModal') runABIModal: ModalComponent;
    // Modal window options
    animation: boolean = true;
    keyboard: boolean = true;
    backdrop: string = 'static';
    cssClass: string = '';
    css: boolean = false;
    // Modal execute form
    runABIForm: FormGroup;
    // ABI Parameters
    abiParameters: ABIParameters
    availableFssMeasures = ["Mutual Information"]
    availableDataFiles = []

    constructor(
        private fb: FormBuilder,
        private _runAlgorithmService: RunAlgorithmService) { }

    ngOnInit() {
		this.showRunABIModalEvents = this._runAlgorithmService.getShowRunABIModalEvents();
		this.showRunABIModalEventsSubscription = this.showRunABIModalEvents.subscribe(
            (msg) => this.showModal(),
            (err) => { console.log("There was an error with the runAlgorithmShowModal event emission") }
        );

        // Initialize the ABI parameters 
        this.abiParameters = {
            selectedFile: '',
            fssMeasure: this.availableFssMeasures[0],
            maxIslandSize: 5,
            baseLvCardinality: 2,
            udTestThreshold: 3.0,
            batchSize: 1000
        }

        this.buildForm();
	}

    showModal() {
      this.runABIModal.open();
    }

    executeABI(){
        this.runABIModal.close();
        this._runAlgorithmService.executeABI();
    }

    buildForm(): void {
    this.runABIForm = this.fb.group({
        'fssMeasure': [this.abiParameters.fssMeasure, [
            Validators.required,
            ]
        ],
        'selectedFile': [this.abiParameters.selectedFile, [
            Validators.required
            ]
        ],
        'maxIslandSize': [this.abiParameters.maxIslandSize, [ 
            Validators.required,
            CustomValidators.min(2)
            ]
        ],
        'baseLvCardinality': [this.abiParameters.baseLvCardinality, [
            Validators.required,
            CustomValidators.min(2)
            ]
        ],
        'udTestThreshold': [this.abiParameters.udTestThreshold, [
            Validators.required,
            CustomValidators.range([0.1, 100.0])
            ]
        ],
        'batchSize': [this.abiParameters.batchSize, [
            Validators.required,
            CustomValidators.min(1)
            ]
        ]
    });
    
    this.runABIForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
    
    this.onValueChanged(); // (re)set validation messages now
  }

  onValueChanged(data?: any) {
    if (!this.runABIForm) { return; }
    const form = this.runABIForm;

    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }


  formErrors = {
    'fssMeasure': '',
    'selectedFile': '',
    'maxIslandSize': '',
    'baseLvCardinality': '',
    'udTestThreshold': '',
    'batchSize': '',
  };
  validationMessages = {
    'fssMeasureme': {
      'required': 'Value is required.'
    },
    'selectedFile': {
      'required': 'Value is required.'
    },
    'maxIslandSize': {
      'required': 'Value is required.',
      'min': 'Minimum island size is 2'
    },
    'baseLvCardinality': {
      'required': 'Value is required.',
      'min': 'Minimum base LV cardinality is 2'
    },
    'udTestThreshold': {
      'required': 'Value is required.',
      'range': 'UD test threshold range is [0.1, 100]'
    },
    'batchSize': {
      'required': 'Value is required.',
      'min': 'Minimum batch size is 1'
    },
  };

}