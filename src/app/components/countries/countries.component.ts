import { Component, OnInit, Output } from '@angular/core';
import { Dimension, EndecapodService, SearchResult } from '@ibfd/endecapod';
import { map, take } from 'rxjs';
import { AppConfigData } from 'src/app/model/config/app-config-data';
import { Country } from 'src/app/model/data/country';
import { AppConfigService } from 'src/app/services/app-config.service';
import { ExposeService } from 'src/app/services/expose.service';
import { ResultService } from 'src/app/services/result.service';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css'],
  providers: [
    { provide: ExposeService, useClass: ExposeService },
  ],
})
export class CountriesComponent implements OnInit {

  private countryDimension: Dimension;
  private appConfigData: AppConfigData;

  country: Object;
  selectedCountry: Country;

  relatedCountry: Object[];

  // @Output()
  // relatedCountryDisabled = new EventEmitter<boolean>();

  constructor(
    private appConfigService: AppConfigService,
    private endecapodService: EndecapodService,
    private exposeService: ExposeService,
    private resultService: ResultService
  ) {
    this.appConfigData = new AppConfigData(this.appConfigService.config);
  }

  ngOnInit(): void {
    this.countryDimension = this.appConfigData.getCountryDimension();
    this.configureCountryExposeService();
    this.exposeService.Query()
      .pipe(map(res => new SearchResult(res)), take(1))
      .subscribe(res => {
        this.country = res.getDimension(this.countryDimension.id)?.values;
      });
  }

  configureCountryExposeService() {
    this.exposeService.setName('Country ' + this.countryDimension.id + '-ExposeService');
    this.exposeService.Copy(this.endecapodService);
    this.exposeService.setDym(false);
    this.exposeService.SetNe([this.countryDimension.id]);
  }

  // configureRelatedCountryExposeService() {

  //   const relatedCountryDimension = this.appConfigData.getRelatedCountryDimension();
  //   this.exposeService.setName('Related-Country ' + relatedCountryDimension.id + '-ExposeService');
  //   this.exposeService.Copy(this.endecapodService);
  //   this.exposeService.setDym(false);
  //   this.exposeService.SetNe([relatedCountryDimension.id]);
  //   this.exposeService.Query()
  //     .pipe(map(res => new SearchResult(res)), take(1))
  //     .subscribe(res => {
  //       this.relatedCountry = res.getDimension(relatedCountryDimension.id)?.values;
  //       console.log("Related country lengths " + this.relatedCountry.length);

  //       if (this.relatedCountry.length < 1) {
  //         this.relatedCountryDisabled.emit(true);
  //       } else {
  //         this.relatedCountryDisabled.emit(false);
  //       }
  //     });
  // }



  onCountryChange() {
    if (this.selectedCountry) {
      this.resultService.addCountry(this.selectedCountry);
    }
    // this.configureRelatedCountryExposeService();
  }


  onClearClick() {
    this.resultService.removeCountry();
  }

}
