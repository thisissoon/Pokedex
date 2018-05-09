import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserTransferStateModule, TransferState } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { AppConfigService } from './config/app-config.service';
import { ConfigLoaderBrowser } from './config/config-loader.browser';

// APP_INITIALIZERs run before the app bootstraps at runtime.
// This makes it the perfect place to load app critical config.
// Uses the browser config loader to use Angular HTTP to request the
// config from the assets folder and return the config object.
const appInitializerFn = (
  appConfig: AppConfigService,
  http: HttpClient,
  transferState: TransferState
) => {
  return () => {
    const loader = new ConfigLoaderBrowser(http, transferState);
    return loader.loadAppConfig().then(data => {
      appConfig.config = data;
    });
  };
};

@NgModule({
  imports: [
    AppModule
    // gives browser access to transfer state injection token however not required for this app.
    // BrowserTransferStateModule
  ],
  providers: [
    AppConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFn,
      multi: true,
      deps: [AppConfigService, HttpClient, TransferState]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppBrowserModule { }

