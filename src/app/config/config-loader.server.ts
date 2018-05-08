import {
  StateKey,
  makeStateKey,
  TransferState
} from '@angular/platform-browser';

import { AppConfig } from './app-config.models';

declare var require: any;
declare var process: any;
const fs = require('fs');
const path = require('path');

// Load config using node.js 'fs' module.
// fs required as node requires absolute URLs for HTTP requests.
export class ConfigLoaderServer {
  constructor(private transferState: TransferState) { }
  // load config file using fs module.
  public loadAppConfig(): Promise<AppConfig> {
    return new Promise(resolve => {
      const assets_folder = path.join(
        process.cwd(),
        'dist',
        'server',
        'assets'
      );

      const jsonData = JSON.parse(
        fs.readFileSync(`${assets_folder}/app-config.json`, 'utf8')
      );

      // Here we save the config to the state transfer service
      // so when app is run on browser it doesn't have to make
      // a http request for the app config file.
      const key: StateKey<AppConfig> = makeStateKey<AppConfig>('app-config');
      this.transferState.set<AppConfig>(key, jsonData);

      // return app config object on resolve
      resolve(jsonData);
    });
  }
}
