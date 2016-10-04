import { Component } from '@angular/core';
import { remote, ipcRenderer } from 'electron';

@Component({
  selector: 'my-app',
  templateUrl: 'app/app.component.html',
  styleUrls: ['app/app.component.css']
})
export class AppComponent {

    constructor(){
        //ipcRenderer.on('open-file', this.openFunc);
        //ipcRenderer.on('save-file', this.save.bind(this));
    }

    private openFunc = (event,jsonContent) => {
        alert("Opening file")
        console.log(JSON.stringify(jsonContent))
    }

    save() {console.log("Save recibido");}

}