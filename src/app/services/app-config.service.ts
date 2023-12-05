import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {
  private appConfig: any;

  constructor(private httpClient: HttpClient) { }
  loadAppConfig() {
    const url = environment.config;
    return this.httpClient
      .get(url, {withCredentials: true})
      .toPromise()
      .then(data => {
        this.appConfig = data;
      })
      .catch(err => {
          this.appConfig = {'error': err};
      });
  }

  get config() {
    return this.appConfig;
  }
}
