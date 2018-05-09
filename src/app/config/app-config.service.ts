import { Injectable } from '@angular/core';
import { AppConfig } from './app-config.models';

@Injectable()
export class AppConfigService {
  public config: AppConfig;
}
