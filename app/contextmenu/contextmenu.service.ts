import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject'
import { Observable } from 'rxjs/Observable'
import {IContextMenuLinkConfig} from './contextmenu-linkconfig'

export class ContextMenuClickEvent {
    links: IContextMenuLinkConfig[];
    event: MouseEvent;
    item: any;

    constructor(links: IContextMenuLinkConfig[], event: MouseEvent, item: any){
        this.links = links;
        this.event =  event;
        this.item = item;
    }
}

@Injectable()
export class MyContextMenuService {

    constructor() { }

    private showMenuEventsEmitter: Subject<ContextMenuClickEvent> = new Subject<ContextMenuClickEvent>();

    public newShowMenuEvent(event: ContextMenuClickEvent){
        this.showMenuEventsEmitter.next(event)
    }

    public getShowMenuEvents(): Observable<ContextMenuClickEvent>{
        return this.showMenuEventsEmitter.asObservable()
    }

}