import {Component, ViewChild, OnInit, ViewEncapsulation} from '@angular/core';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

@Component({
    moduleId: module.id,
    selector: 'modal-window-test',
    templateUrl: 'modal-window-test.component.html',
    encapsulation: ViewEncapsulation.None
})
export class ModalWindowTestComponent implements OnInit {

    @ViewChild('modal')
    modal: ModalComponent;

    constructor() { 
    }

    ngOnInit() { }
}