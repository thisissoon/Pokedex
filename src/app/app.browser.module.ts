import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserTransferStateModule, TransferState } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';

@NgModule({
  imports: [
    AppModule
    // gives browser access to transfer state injection token however not required for this app.
    // BrowserTransferStateModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppBrowserModule { }

