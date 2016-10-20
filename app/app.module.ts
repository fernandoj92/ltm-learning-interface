
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// Modules
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
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
import { RunABIComponent } from './run-algorithm/run-abi/run-abi.component'
import { RunSALLComponent } from './run-algorithm/run-sall/run-sall.component'
// Directives
import { ContextMenuDirective } from './contextmenu/contextmenu.directive'
// Services
import { IpcInputService } from './services/ipc/ipc-input.service';
import { IpcOutputService} from './services/ipc/ipc-output.service'
import { InMemoryDataService } from './services/storage/in-memory-data.service'
import { HttpService } from './services/http/http.service'
import { MyContextMenuService } from './contextmenu/contextmenu.service'
import { StreamListOutputService } from './stream-list/stream-list-output.service'
import { RunAlgorithmService } from './run-algorithm/run-algorithm.service'

@NgModule({
  imports:      [ 
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    JsonpModule,
    Ng2Bs3ModalModule
  ],
  providers:    [ 
    IpcInputService,
    IpcOutputService,
    InMemoryDataService,
    MyContextMenuService, 
    StreamListOutputService,
    RunAlgorithmService,
    HttpService
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
    RunABIComponent, 
    RunSALLComponent
   ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
