import { Component } from '@angular/core';
import { remote, ipcRenderer } from 'electron';

@Component({
  selector: 'my-app',
  template: '<h1>My First Angular 2 RC6 App with Electron</h1>'
})
export class AppComponent {

  constructor(){
    
        ipcRenderer.on('load-BN',function(event,jsonContent){
            alert(JSON.stringify(jsonContent))
            console.log(JSON.stringify(jsonContent))
        });
        
        ipcRenderer.on('open-file',function(event,jsonContent){
            alert(JSON.stringify(jsonContent))
            console.log(JSON.stringify(jsonContent))
        });

        ipcRenderer.on('save-file', this.save.bind(this));
    }

    open(){ console.log("Open recibido");}

    save() {console.log("Save recibido");}
 }