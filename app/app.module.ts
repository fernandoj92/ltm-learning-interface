
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// Components
import { AppComponent }   from './app.component';
import { StreamListComponent } from './stream-list/stream-list.component'
import { CptViewComponent } from './dashboard/cpt-view/cpt-view.component'
import { DagViewComponent } from './dashboard/dag-view/dag-view.component'
import { ServiceNotificationsComponent } from './service-notifications/service-notifications.component'
import { TestDagComponent } from './dashboard/test-dag/test-dag.component'
import { TestCytoscapeComponent } from './dashboard/test-cytoscape/test-cytoscape.component'
import { ContextMenuHolderComponent } from './contextmenu/contextmenu-holder.component'
import { ModalWindowTestingComponent } from './modal-window-testing/modal-window-testing.component'
// Directives
import { ContextMenuDirective } from './contextmenu/contextmenu.directive'
// Services
import { IpcService } from './services/ipc/ipc.service';
import { InMemoryDataService } from './services/storage/in-memory-data.service'
import { MyContextMenuService } from './contextmenu/contextmenu.service'

// modal windows
import { BootstrapModalModule  } from 'angular2-modal/plugins/bootstrap'

@NgModule({
  imports:      [ BrowserModule ],
  providers:    [ 
    IpcService,
    InMemoryDataService,
    MyContextMenuService,
    BootstrapModalModule.getProviders()
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
    ModalWindowTestingComponent
   ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
