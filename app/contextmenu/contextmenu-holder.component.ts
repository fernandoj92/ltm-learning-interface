import { Component, OnInit } from '@angular/core';
import { MyContextMenuService } from './contextmenu.service'
import { IContextMenuLinkConfig } from './contextmenu-linkconfig'


@Component({
  moduleId: module.id,
  selector:'context-menu-holder',
  styleUrls: ['contextmenu-holder.component.css'],
  host:{
    '(document:click)':'clickedOutside()'
  },
  templateUrl: 'contextmenu-holder.component.html'
})
export class ContextMenuHolderComponent implements OnInit{

  public links: IContextMenuLinkConfig[] = [];
  public isShown = false;
  public item: any;

  private showMenuEventsSubscription

  private mouseLocation :{left:number,top:number} = {left:0, top:0};

  constructor(private _contextMenuService: MyContextMenuService){
    this.showMenuEventsSubscription = _contextMenuService.getShowMenuEvents()
      .subscribe(e => this.showMenuEvent(e.item, e.event, e.links));
  }

  ngOnInit(){

  }

  // the css for the container div
  get locationCss(){
    return {
      'position':'fixed',
      'display':this.isShown ? 'block':'none',
      left:this.mouseLocation.left + 'px',
      top:this.mouseLocation.top + 'px',
    };
  }

  public clickedOutside(){
    this.isShown= false; // hide the menu
  }

  public showMenuEvent(item: any, event: MouseEvent, links?: any[]){
    this.showMenu();
    this.links = links;
    this.item = item;
    this.mouseLocation = {
      left: event.clientX,
      top: event.clientY,
    };
  }

  public execute(link: IContextMenuLinkConfig, $event?:MouseEvent): void{
    //link.subject.next(link.title)
     /*if (this.isDisabled(link)) {
      return;
    }*/
    this.hideMenu();
    link.click(this.item, $event);
  }

  public hideMenu(){
    this.isShown = false;
  }

  public showMenu(){
    this.isShown = true;
  }
}