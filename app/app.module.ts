
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// Components
import { AppComponent }   from './app.component';
//Services
import { IpcService } from './ipc/ipc.service';
import { InMemoryDataService } from './storage/in-memory-data.service'

@NgModule({
  imports:      [ BrowserModule ],
  declarations: [ AppComponent ],
  providers:    [ 
    IpcService,
    InMemoryDataService
   ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
