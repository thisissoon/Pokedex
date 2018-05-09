import {
  StateKey,
  makeStateKey,
  TransferState
} from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from './app-config.models';

// Load config using angular http client which accepts relative paths.
// However check if data is already in transfer state object (i.e has
// already ben retrived when the server app ran)
export class ConfigLoaderBrowser {

  constructor(private http: HttpClient, private transferState: TransferState) { }

  loadAppConfig(): Promise<AppConfig> {
    const key: StateKey<AppConfig> = makeStateKey<AppConfig>('app-config');
    const data = this.transferState.get<AppConfig>(key, null);

    if (data) {
      return new Promise((resolve, reject) => {
        resolve(data);
      });
    } else {
      return this.http
        .get<AppConfig>('/assets/app-config.json')
        .toPromise();
    }
  }
}
