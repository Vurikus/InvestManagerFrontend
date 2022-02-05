import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private readonly config: {
    apiUrl: string;
    wsUrl: string;
  };

  constructor() {
    this.config = {
      apiUrl: environment.apiUrl,
      wsUrl: environment.wsUrl
    };
  }

  public getConfig(keys: string[]): any {
    return Object.keys(this.config)
      .filter(key => keys.includes(key))
      .reduce((obj, key) => {
        obj[key] = this.config[key];
        return obj;
      }, {});
  }
}
