
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// Components
import { AppComponent }   from './app.component';
import { StreamListComponent } from './stream-list/stream-list.component'
import { CptViewComponent } from './dashboard/cpt-view/cpt-view.component'
import { DagViewComponent } from './dashboard/dag-view/dag-view.component'
import { ServiceNotificationsComponent } from './service-notifications/service-notifications.component'

//Services
import { IpcService } from './services/ipc/ipc.service';
import { InMemoryDataService } from './services/storage/in-memory-data.service'

@NgModule({
  imports:      [ BrowserModule ],
  declarations: [ 
    AppComponent,
    ServiceNotificationsComponent,
    StreamListComponent,
    CptViewComponent,
    DagViewComponent
   ],
  providers:    [ 
    IpcService,
    InMemoryDataService
   ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
