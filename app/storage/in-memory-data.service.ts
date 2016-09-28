import { Injectable } from '@angular/core';

import { Stream } from '../model/stream'

import { remote, ipcRenderer } from 'electron';
 
@Injectable()
export class InMemoryDataService{

    streams: Stream[]

    constructor(){
        this.streams =  new Array();

        ipcRenderer.on('load-BN',function(event,jsonContent){
            alert(JSON.stringify(jsonContent))
            console.log(JSON.stringify(jsonContent))
        });
    }

    public getStreamsReference(){ return this.streams }

    private loadBn = (event, jsonContent) => {
        
    }

}