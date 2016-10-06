import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject'
import { Observable } from 'rxjs/Observable'

@Injectable()
export class MyContextMenuService {

    constructor() { }

    public show:Subject<{event:MouseEvent,obj:any[]}> = new Subject<{event:MouseEvent,obj:any[]}>();
}