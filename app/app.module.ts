
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// Modules
import { FormsModule } from '@angular/forms';
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
import { ModalWindowTestComponent } from './modal-window-testing/modal-window-test.component'
import { RunAlgorithmComponent } from './run-algorithm/run-algorithm.component'
// Directives
import { ContextMenuDirective } from './contextmenu/contextmenu.directive'
// Services
import { IpcInputService } from './services/ipc/ipc-input.service';
import { IpcOutputService} from './services/ipc/ipc-output.service'
import { InMemoryDataService } from './services/storage/in-memory-data.service'
import { MyContextMenuService } from './contextmenu/contextmenu.service'
import { StreamListOutputService } from './stream-list/stream-list-output.service'
import { RunAlgorithmService } from './run-algorithm/run-algorithm.service'

@NgModule({
  imports:      [ 
    BrowserModule,
    FormsModule,
    Ng2Bs3ModalModule
  ],
  providers:    [ 
    IpcInputService,
    IpcOutputService,
    InMemoryDataService,
    MyContextMenuService, 
    StreamListOutputService,
    RunAlgorithmService
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
    ModalWindowTestComponent, 
    RunAlgorithmComponent
   ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
