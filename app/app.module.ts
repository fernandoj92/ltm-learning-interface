
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// Modules
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';
// Components
import { AppComponent }   from './app.component';
import { StreamListComponent } from './stream-list/stream-list.component'
import { CptViewComponent } from './dashboard/cpt-view/cpt-view.component'
import { DagViewComponent } from './dashboard/dag-view/dag-view.component'
import { ServiceNotificationsComponent } from './service-notifications/service-notifications.component'
import { TestDagComponent } from './dashboard/test-dag/test-dag.component'
import { TestCytoscapeComponent } from './dashboard/test-cytoscape/test-cytoscape.component'
import { ContextMenuHolderComponent } from './contextmenu/contextmenu-holder.component'
// Directives
import { ContextMenuDirective } from './contextmenu/contextmenu.directive'
// Services
import { IpcService } from './services/ipc/ipc.service';
import { InMemoryDataService } from './services/storage/in-memory-data.service'
import { MyContextMenuService } from './contextmenu/contextmenu.service'

@NgModule({
  imports:      [ 
    BrowserModule,
    Ng2Bs3ModalModule
  ],
  providers:    [ 
    IpcService,
    InMemoryDataService,
    MyContextMenuService
   ],
   declarations: [ 
    AppComponent,
    ServiceNotificationsComponent,
    StreamListComponent,
    CptViewComponent,
    DagViewComponent,
    TestDagComponent,
    TestCytoscapeComponent,
    ContextMenuDirective,
    ContextMenuHolderComponent,
   ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
