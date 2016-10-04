
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// Components
import { AppComponent }   from './app.component';
import { StreamListComponent } from './stream-list/stream-list.component'
import { CptViewComponent } from './dashboard/cpt-view/cpt-view.component'
import { DagViewComponent } from './dashboard/dag-view/dag-view.component'
import { ServiceNotificationsComponent } from './service-notifications/service-notifications.component'
import { TestCdComponent } from './test-cd/test-cd.component'
import { TestDagComponent } from './dashboard/test-dag/test-dag.component'
//Services
import { IpcService } from './services/ipc/ipc.service';
import { InMemoryDataService } from './services/storage/in-memory-data.service'
import { TestCdService } from './test-cd/test-cd.service'

@NgModule({
  imports:      [ BrowserModule ],
  declarations: [ 
    AppComponent,
    ServiceNotificationsComponent,
    StreamListComponent,
    CptViewComponent,
    DagViewComponent,
    TestCdComponent, 
    TestDagComponent
   ],
  providers:    [ 
    IpcService,
    InMemoryDataService, 
    TestCdService
   ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
