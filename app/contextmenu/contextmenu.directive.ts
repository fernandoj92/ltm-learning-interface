import { Directive, Input } from '@angular/core';
import { MyContextMenuService } from './contextmenu.service'

@Directive({
  selector:'[context-menu]',
  host:{'(contextmenu)':'rightClicked($event)'}
})
export class ContextMenuDirective{

  @Input('context-menu') links;

  constructor(private _contextMenuService:MyContextMenuService){
  }

  rightClicked(event:MouseEvent){
    this._contextMenuService.show.next({event:event,obj:this.links});
    event.preventDefault(); // to prevent the browser contextmenu
  }
}