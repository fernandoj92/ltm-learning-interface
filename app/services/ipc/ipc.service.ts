import { Injectable } from '@angular/core';

import { remote, ipcRenderer } from 'electron';

// Esta primera version del FileService no sigue buenas practicas de desacoplamiento

@Injectable()
export class IpcService {

    constructor() { 
    }
}