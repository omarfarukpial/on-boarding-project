import { Injectable } from '@angular/core';
import { AppConfigService } from './app-config.service';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { AppConfigData } from '../model/config/app-config-data';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DWayService {
  private baseURL: string;
  private appConfigData: AppConfigData;
  private docURL: string = "";

  constructor(
    private appConfigServer: AppConfigService,
    private http: HttpClient,
    ) {
      this.appConfigData = new AppConfigData(this.appConfigServer.config);
      this.baseURL = this.appConfigData.getDWayURL();
      this.docURL = localStorage.getItem('docURL') || '';
     }



     public LoadDocument(): Observable<HttpResponse<string>> {
      const u = this.dwayURL(this.docURL);
      console.log('LoadDocument: ' + u);
      return this.http.get(u, { withCredentials: true, observe: 'response', responseType: 'text' });
    }
  
    private dwayURL(docPath: string): string {
      return this.baseURL.concat(docPath);
    }

    setDocURL(docURL: string) {
      this.docURL = docURL;
      localStorage.setItem('docURL', docURL);
    }
}
