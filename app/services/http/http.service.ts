import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import {Subject} from 'rxjs/Subject'
import {Observable} from 'rxjs/Observable'
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { AbstractNotificationService } from '../notification/abstractNotificationService'
import { ABIParameters } from '../../model/algorithms/availableAlgorithms'

@Injectable()
export class HttpService extends AbstractNotificationService{

    private baseUrl: string = "http://localhost:8899"

    private getDataFileNamesUrl: string = this.baseUrl + "/listLocalDataFiles"
    private getFssMeasuresUrl: string = this.baseUrl + "/listFssMeasures";
    private runABIUrl: string = this.baseUrl + "/learn/flatLTM/ABI";
    
    // Event emitters
    runABIResultEventEmitter: Subject<any>

    constructor(private http: Http){
        super("HttpService")
        this.runABIResultEventEmitter = new Subject<any>()
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

    executeABI(abiParameters: ABIParameters): void {
        //let bodyString = JSON.stringify(abiParameters); 
        let headers    = new Headers({ 'Content-Type': 'application/json' }); 
        let options    = new RequestOptions({ headers: headers }); 

        this.notifyMsg("executeABI")
        this.notifyMsg(JSON.stringify(abiParameters))
        
        let asyncResult = this.http.post(this.runABIUrl, abiParameters, options)
                                    .map(this.extractData)
                                    .catch(this.handleError);

        asyncResult.subscribe(
            (result) => this.runABIResultEventEmitter.next(result),
        );
    }

    getRunABIResultEvents(): Observable<any>{
        return this.runABIResultEventEmitter.asObservable();
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