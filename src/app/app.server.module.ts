import { NgModule } from '@angular/core';
import { ServerModule, ServerTransferStateModule } from '@angular/platform-server';
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';

// Module bootstrapped by angular when bundling for server side bundles.
@NgModule({
  imports: [
    AppModule,
    ServerModule,
    ModuleMapLoaderModule,
    // creates object at bottom of ssr pages. Can be seen by inspecting source.
    ServerTransferStateModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppServerModule { }
