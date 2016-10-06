import { Component, OnInit } from '@angular/core';
import { Subject} from 'rxjs/Subject'

@Component({
    moduleId: module.id,
    selector:'contextmenu-test',
    template:`
    <div [context-menu]="links" >right click here ... {{firstRightClick}}</div>
    <div [context-menu]="anotherLinks">Also right click here...{{secondRightClick}}</div>
    `
})
export class ContextMenuTestComponent{
  firstRightClick; secondRightClick;
  links;
  anotherLinks;
  constructor(){
    this.links = [
      {title:'a',subject:new Subject()},
      {title:'b',subject:new Subject()},
      {title:'c',subject:new Subject()}
    ];
    this.anotherLinks = [
      {title:'link 1',subject:new Subject()},
      {title:'link 2',subject:new Subject()},
      {title:'link 3',subject:new Subject()}
    ];
  }

  // subscribe to subjects
  ngOnInit(){
    this.links.forEach(l => l.subject.subscribe(val=> this.firstCallback(val)));
    this.anotherLinks.forEach(l => l.subject.subscribe(val=> this.secondCallback(val)))
  }
  firstCallback(val){
    this.firstRightClick = val;
  }
  secondCallback(val){
    this.secondRightClick = val;
  }
}