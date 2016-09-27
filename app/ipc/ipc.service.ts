import { Injectable } from '@angular/core';

import {ipcRenderer} from 'electron'

// Esta primera version del FileService no sigue buenas practicas de desacoplamiento

@Injectable()
export class IpcService {

    constructor() { 
        ipcRenderer.on('load-BN',function(event,jsonContent){
            alert(JSON.stringify(jsonContent))
            console.log(JSON.stringify(jsonContent))
        });
    }
}