import { Component, Input, OnInit } from '@angular/core';
import { Dimension, EndecapodService, SearchResult } from '@ibfd/endecapod';
import { map, take } from 'rxjs';
import { AppConfigData } from 'src/app/model/config/app-config-data';
import { RelatedCountry } from 'src/app/model/data/relatedCountry';
import { AppConfigService } from 'src/app/services/app-config.service';
import { ExposeService } from 'src/app/services/expose.service';
import { ResultService } from 'src/app/services/result.service';
interface City {
  name: string;
  code: string;
}
@Component({
  selector: 'app-related-countries',
  templateUrl: './related-countries.component.html',
  styleUrls: ['./related-countries.component.css'],
  providers: [
    { provide: ExposeService, useClass: ExposeService },
  ],
})
export class RelatedCountriesComponent implements OnInit {
  private relatedCountryDimension: Dimension;
  private appConfigData: AppConfigData;

  relatedCountry: Object;
  selectedRelatedCountry: RelatedCountry;

  // @Input() relatedCountryDisabled: boolean;




  constructor(
    private appConfigService: AppConfigService,
    private endecapodService: EndecapodService,
    private exposeService: ExposeService,
    private resultService: ResultService
  ) {
    this.appConfigData = new AppConfigData(this.appConfigService.config);
  }

  ngOnInit(): void { }

  configureRelatedCountryExposeService() {
    this.exposeService.setName('Related-Country ' + this.relatedCountryDimension.id + '-ExposeService');
    this.exposeService.Copy(this.endecapodService);
    this.exposeService.setDym(false);
    this.exposeService.SetNe([this.relatedCountryDimension.id]);
  }

  onRelatedCountryDropdownShow() {
    this.relatedCountryDimension = this.appConfigData.getRelatedCountryDimension();
    this.configureRelatedCountryExposeService();
    this.exposeService.Query()
      .pipe(map(res => new SearchResult(res)), take(1))
      .subscribe(res => {
        this.relatedCountry = res.getDimension(this.relatedCountryDimension.id)?.values;
      });
  }

  onRelatedCountryChange() {
    if (this.selectedRelatedCountry) {
      this.resultService.addRelatedCountry(this.selectedRelatedCountry);
    }
  }

  onClearClick() {
    this.resultService.removeRelatedCountry();
  }


}
