import { NgModule, APP_INITIALIZER } from '@angular/core';
import { ServerModule, ServerTransferStateModule } from '@angular/platform-server';
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';
import { TransferState } from '@angular/platform-browser';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { AppConfigService } from './config/app-config.service';
import { ConfigLoaderServer } from './config/config-loader.server';

// APP_INITIALIZERs run before the app bootstraps at runtime.
// This makes it the perfect place to load app critical config.
// Uses the server config loader to use node's fs to get the
// config from the assets folder and return the config object.
const appInitializerFn = (
  appConfig: AppConfigService,
  transferState: TransferState
) => {
  return () => {
    const loader = new ConfigLoaderServer(transferState);
    return loader.loadAppConfig().then(data => {
      appConfig.config = data;
    });
  };
};

// Module bootstrapped by angular when bundling for server side bundles.
@NgModule({
  imports: [
    AppModule,
    ServerModule,
    ModuleMapLoaderModule,
    // creates object at bottom of ssr pages. Can be seen by inspecting source.
    ServerTransferStateModule
  ],
  providers: [
    AppConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFn,
      multi: true,
      deps: [AppConfigService, TransferState]
    }
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule { }
