import { Component } from '@angular/core';
import { AppConfigData } from './model/config/app-config-data';
import { AppConfigService } from './services/app-config.service';
import { EdcaUrlSerializer, EndecapodService } from '@ibfd/endecapod';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'on-boarding-project';

  private appConfigData: AppConfigData;


  constructor(
    private appConfigService: AppConfigService,
    private endecapodService: EndecapodService,
    private urlSerializer: EdcaUrlSerializer
  ) {
    this.appConfigData = new AppConfigData(this.appConfigService.config);
    this.endecapodService.setName('endecapodService');
    this.endecapodService.setURL(this.appConfigData.getEndecapodURL(), this.appConfigData.getAwareURL());
    this.endecapodService.RegisterParams(this.urlSerializer.parse(this.appConfigData.getInitQuery()).queryParamMap);
  }
  ngOnInit() {
  }
}
