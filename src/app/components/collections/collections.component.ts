import { Component, OnInit } from '@angular/core';
import { Dimension, EndecapodService, SearchResult } from '@ibfd/endecapod';
import { map, take } from 'rxjs';
import { AppConfigData } from 'src/app/model/config/app-config-data';
import { AppConfigService } from 'src/app/services/app-config.service';
import { ExposeService } from 'src/app/services/expose.service';
import { ResultService } from 'src/app/services/result.service';

export interface Collection {
  id: number;
  name: String;
}

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.css'],
  providers: [
    { provide: ExposeService, useClass: ExposeService },
  ],
})
export class CollectionsComponent implements OnInit {

  private collectionDimension: Dimension;
  private appConfigData: AppConfigData;

  collection: Object;
  selectedCollection: Collection;

  constructor(
    private appConfigService: AppConfigService,
    private endecapodService: EndecapodService,
    private exposeService: ExposeService,
    private resultService: ResultService
    ) {
      this.appConfigData = new AppConfigData(this.appConfigService.config);
     }

  ngOnInit(): void {
    this.collectionDimension = this.appConfigData.getCollectionDimension();
    this.configureCollectionExposeService();
    this.exposeService.Query()
    .pipe(map(res => new SearchResult(res)),take(1))
    .subscribe(res => {
      this.collection = res.getDimension(this.collectionDimension.id)?.values;
      });
  }

  configureCollectionExposeService() {
    this.exposeService.setName('Collection ' + this.collectionDimension.id + '-ExposeService');
    this.exposeService.Copy(this.endecapodService);
    this.exposeService.setDym(false);
    this.exposeService.SetNe([this.collectionDimension.id]);
  }


  onCollectionChange(event: Event) {
    if (this.selectedCollection === null) {
      this.resultService.removeCollection();
    } else {
      this.resultService.setCollection(this.selectedCollection);
    }
  }

}
