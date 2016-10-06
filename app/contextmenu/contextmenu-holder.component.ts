import { Component, OnInit } from '@angular/core';
import { MyContextMenuService } from './contextmenu.service'

@Component({
  moduleId: module.id,
  selector:'context-menu-holder',
  styles:[
    '.container{width:150px;background-color:#eee}',
    '.link{}','.link:hover{background-color:#abc}',
    'ul{margin:0px;padding:0px;list-style-type: none}'
  ],
  host:{
    '(document:click)':'clickedOutside()'
  },
  template:
  `<div [ngStyle]="locationCss" class="container">
      <ul>
          <li (click)="link.subject.next(link.title)" class="link" *ngFor="let link of links">
              {{link.title}}
          </li>
      </ul>
    </div>
  `
})
export class ContextMenuHolderComponent implements OnInit{

  links = [];
  isShown = false;
  private mouseLocation :{left:number,top:number} = {left:0, top:0};

  constructor(private _contextMenuService: MyContextMenuService){
    _contextMenuService.show.subscribe(e => this.showMenu(e.event,e.obj));
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

  clickedOutside(){
    this.isShown= false; // hide the menu
  }

  // show the menu and set the location of the mouse
  showMenu(event,links){
    this.isShown = true;
    this.links = links;
    this.mouseLocation = {
      left:event.clientX,
      top:event.clientY
    }
  }
}