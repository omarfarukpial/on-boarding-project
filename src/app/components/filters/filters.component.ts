import { Component, Input, OnInit } from '@angular/core';
import { Dimension, EndecapodService, SearchResult } from '@ibfd/endecapod';
import { Interface } from 'readline';
import { map, take } from 'rxjs';
import { AppConfigData } from 'src/app/model/config/app-config-data';
import { Collection } from 'src/app/model/data/collection';
import { Country } from 'src/app/model/data/country';
import { Filter } from 'src/app/model/data/filter';
import { RelatedCountry } from 'src/app/model/data/relatedCountry';
import { AppConfigService } from 'src/app/services/app-config.service';
import { ExposeService } from 'src/app/services/expose.service';
import { ResultService } from 'src/app/services/result.service';


@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css'],
  providers: [
    { provide: ExposeService, useClass: ExposeService },
  ],
})
export class FiltersComponent implements OnInit {




  private appConfigData: AppConfigData;

  selectedCollectionId: number;

  filters: Object[];



  filterItems: Filter[] = [];


  constructor(
    private resultService: ResultService,
    private appConfigService: AppConfigService,
    private exposeService: ExposeService,
    private endecapodService: EndecapodService
  ) {
    this.appConfigData = new AppConfigData(this.appConfigService.config);
  }

  ngOnInit(): void {

  }


  showEmmit(event: Collection) {
    this.filterItems = [];
    this.selectedCollectionId = event.id;
    this.filters = this.appConfigData.getCollectionFilters(this.selectedCollectionId);
    this.filters.forEach(filter => {
      if (this.appConfigData.getDimensionAlias(filter['N'], this.selectedCollectionId) != '-' && this.appConfigData.getDimensionAlias(filter['N'], this.selectedCollectionId) != '' && filter['N'])
        this.filterItems.push({ id: filter['N'], name: this.appConfigData.getDimensionAlias(filter['N'], this.selectedCollectionId), load_on_init: filter['load_on_init'], values: [] });
    });

    this.filterItems.forEach(filterItem => {
      if (filterItem.load_on_init) {
        this.exposeService.setName('Filter ' + filterItem.id + '-ExposeService');
        this.exposeService.Copy(this.endecapodService);
        this.exposeService.setDym(false);
        this.exposeService.SetNe([filterItem.id]);
        this.exposeService.Query()
          .pipe(map(res => new SearchResult(res)), take(1))
          .subscribe(res => {
            filterItem.values = res.getDimension(filterItem.id)?.values;
          });
      }
    });

  }



  onFilterShow(filterItemid: number) {
    this.exposeService.setName('Filter ' + filterItemid + '-ExposeService');
    this.exposeService.Copy(this.endecapodService);
    this.exposeService.setDym(false);
    this.exposeService.SetNe([filterItemid]);
    this.exposeService.Query()
      .pipe(map(res => new SearchResult(res)), take(1))
      .subscribe(res => {
        this.filterItems.forEach(filterItem => {
          if (filterItem.id == filterItemid && !filterItem.load_on_init) {
            filterItem.values = res.getDimension(filterItem.id)?.values;
          }
        });
      });
  }



  filterSubmit() {
    this.resultService.addFilter(this.filterItems);
  }

  onClearClick() {
    this.resultService.removeFilter(this.filterItems);
  }



}
