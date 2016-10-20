import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import {Subject} from 'rxjs/Subject'
import {Observable} from 'rxjs/Observable'
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { AbstractNotificationService } from '../notification/abstractNotificationService'

@Injectable()
export class HttpService extends AbstractNotificationService{

    private baseUrl: string = "http://localhost:8899"

    private getDataFileNamesUrl: string = this.baseUrl + "/listLocalDataFiles"
    private getFssMeasuresUrl: string = this.baseUrl + "/listFssMeasures";

    constructor(private http: Http){
        super("HttpService")
    }

    getLocalDataFileNames(): Observable<string[]> {
        return this.http.get(this.getDataFileNamesUrl)
                    .map(this.extractData)
                    .catch(this.handleError);
    }

    getFssMeasures(): Observable<string[]> {
        return this.http.get(this.getFssMeasuresUrl)
                    .map(this.extractData)
                    .catch(this.handleError);
    }

    private extractData = (res: Response) => {
        let data = res.json();
        return data || { };
    }

    private handleError = (error: any) => {
        let errMsg = (error.message) ? error.message :
        error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        
        this.notifyMsg(errMsg);
        return Observable.throw(errMsg);
    }

}