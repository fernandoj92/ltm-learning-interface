import { Directive, Input } from '@angular/core';
import { MyContextMenuService, ContextMenuClickEvent } from './contextmenu.service'
import { IContextMenuLinkConfig } from './contextmenu-linkconfig'

@Directive({
  selector:'[context-menu]',
  host:{'(contextmenu)':'rightClicked($event)'}
})
export class ContextMenuDirective{

  private _item: any

  @Input('context-menu') links: IContextMenuLinkConfig[];

  @Input() set item(item:any){
    this._item = item
  }

  constructor(private _contextMenuService:MyContextMenuService){
  }

  rightClicked(event: MouseEvent){

    console.log("rightclicked")
    console.log(event.clientX)
    console.log(this._item)

    this._contextMenuService.newShowMenuEvent(new ContextMenuClickEvent(this.links, event, this._item));
    event.preventDefault(); // to prevent the browser contextmenu
  }
}