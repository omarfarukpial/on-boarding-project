import { Injectable } from '@angular/core';
import { EdcaUrlSerializer, EndecapodService, SearchResult } from '@ibfd/endecapod';
import { AppConfigData } from '../model/config/app-config-data';
import { AppConfigService } from './app-config.service';
import { Observable, Subject, filter, of } from 'rxjs';
import { Collection } from '../model/data/collection';
import { Country } from '../model/data/country';
import { RelatedCountry } from '../model/data/relatedCountry';
import { Filter } from '../model/data/filter';

export interface EneRecord {
  properties: any;
  records: EneRecord[];
  dimensionValues: any;
}



@Injectable({
  providedIn: 'root'
})
export class ResultService {

  result: any | SearchResult;

  private currentCollection: Collection;
  private previousCollection: Collection;

  private currentCountry: Country;
  private previousCountry: Country;

  private currentRelatedCountry: RelatedCountry;
  private previousRelatedCountry: RelatedCountry;


  private dataSubject = new Subject<any>();
  data$ = this.dataSubject.asObservable();


  private loadingSubject = new Subject<boolean>();
  loading$ = this.loadingSubject.asObservable();

  private setLoading(loading: boolean) {
    this.loadingSubject.next(loading);
  }



  records: EneRecord[] = [];
  properties: any;
  propertyList: any;

  selectedFilterValuesId: number[] = [];

  totalResultCount: number = 0;

  private appConfigData: AppConfigData;

  constructor(
    private appConfigService: AppConfigService,
    private endecapodService: EndecapodService,
    private urlSerializer: EdcaUrlSerializer
  ) {
    this.appConfigData = new AppConfigData(this.appConfigService.config);

    this.endecapodService.setURL(this.appConfigData.getEndecapodURL(), this.appConfigData.getAwareURL());
    this.endecapodService.RegisterParams(this.urlSerializer.parse('?' + this.appConfigData.getInitQuery()).queryParamMap);
    this.endecapodService.SetN([0]);
    this.endecapodService.PopNe(this.appConfigData.getCollectionDimension().id);
    this.endecapodService.Paginate(0);

  }

  fetchResult(): void {
    this.setLoading(true);
    this.endecapodService.DoSearch();
    this.endecapodService.Result()
      .pipe(filter(val => val instanceof SearchResult))
      .subscribe((res: SearchResult) => {
        this.result = res;
        this.setTotalResultCount(this.result.result.results.numAggrBins);
        this.records = this.result.getRecords();
        this.properties = this.records.map(item => item.records.map(record => record.properties));
        this.propertyList = this.properties.flat();
        this.dataSubject.next(this.propertyList);
        this.setLoading(false);
      });
  }

  setCollection(selectedCollection: Collection) {
    this.setCurrentCollection(selectedCollection);
    this.selectedFilterValuesId = [0];
    this.selectedFilterValuesId.push(this.currentCollection.id);
    this.endecapodService.SetN(this.selectedFilterValuesId);

    // this.previousCollection?.id && this.endecapodService.PopN(this.previousCollection.id);
    // this.endecapodService.AddN(selectedCollection.id);
    // this.previousCollection = selectedCollection;
    this.fetchResult();
  }

  addCountry(selectedCountry: Country) {
    this.setCurrentCountry(selectedCountry);
    this.previousCountry?.id && this.endecapodService.PopN(this.previousCountry.id);
    this.endecapodService.AddN(selectedCountry.id);
    this.previousCountry = selectedCountry;
    this.fetchResult();
  }

  addRelatedCountry(selectedRelatedCountry: RelatedCountry) {
    this.setCurrentRelatedCountry(selectedRelatedCountry);
    this.previousRelatedCountry?.id && this.endecapodService.PopN(this.previousRelatedCountry.id);
    this.endecapodService.AddN(selectedRelatedCountry.id);
    this.previousRelatedCountry = selectedRelatedCountry;
    this.fetchResult();
  }

  setOffset(startingNumber: number) {
    this.endecapodService.Paginate(startingNumber);
    this.fetchResult();
  }

  setTotalResultCount(totalResult: number) {
    this.totalResultCount = totalResult;
  }

  getTotalResultCount(): number {
    return this.totalResultCount;
  }

  getSelectedCollection(): Collection {
    return this.currentCollection;
  }

  getSelectedCollectionId(): Observable<number> {
    return of(this.currentCollection.id);
  }

  getSelectedCountry(): Country {
    return this.currentCountry;
  }

  getSelectedRelatedCountry(): RelatedCountry {
    return this.currentRelatedCountry;
  }

  setCurrentCollection(currentCollection: Collection) {
    this.currentCollection = currentCollection;
  }

  setCurrentCountry(currentCountry: Country) {
    this.currentCountry = currentCountry;
  }

  setCurrentRelatedCountry(currentRelatedCountry: RelatedCountry) {
    this.currentRelatedCountry = currentRelatedCountry;
  }

  removeCollection() {
    // this.previousCollection?.id && this.endecapodService.PopN(this.previousCollection.id);

    this.endecapodService.SetN([0]);
    this.endecapodService.Paginate(0);
    this.fetchResult();
  }

  removeCountry() {
    this.previousCountry?.id && this.endecapodService.PopN(this.previousCountry.id);
    this.endecapodService.Paginate(0);
    this.fetchResult();
  }

  removeRelatedCountry() {
    this.previousRelatedCountry?.id && this.endecapodService.PopN(this.previousRelatedCountry.id);
    this.endecapodService.Paginate(0);
    this.fetchResult();
  }



  addFilter(filterItems: Filter[]) {
    this.selectedFilterValuesId = [0];
    if (this.currentCollection) {
      this.selectedFilterValuesId.push(this.currentCollection.id);
    }
    filterItems.forEach(filterItem => {
      if (filterItem.selectedValue) {
        this.selectedFilterValuesId.push(filterItem.selectedValue.id);
      }
    });
    this.endecapodService.SetN(this.selectedFilterValuesId);
    this.fetchResult();
  }


  removeFilter(filterItems: Filter[]) {
    this.selectedFilterValuesId = [0];
    if (this.currentCollection) {
      this.selectedFilterValuesId.push(this.currentCollection.id);
    }
    filterItems.forEach(filterItem => {
      if (filterItem.selectedValue) {
        this.selectedFilterValuesId.push(filterItem.selectedValue.id);
      }
    });
    this.endecapodService.SetN(this.selectedFilterValuesId);
    this.fetchResult();
  }

}
