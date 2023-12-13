import { Component, HostListener, Injectable, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppConfigData } from 'src/app/model/config/app-config-data';
import { AppConfigService } from 'src/app/services/app-config.service';
import { DWayService } from 'src/app/services/d-way.service';
import { ResultService } from 'src/app/services/result.service';
import { Collection } from '../collections/collections.component';
import { EndecapodService, EneRecord, SearchResult } from '@ibfd/endecapod';



interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css'],
})
export class ResultsComponent implements OnInit {

  results: any[] = [];

  records: any[] = [];


  checkedRecord: any = [];
  selectedRecord: any = [];


  totalResultCount: number;
  loading = true;
  isResultExists = true;

  loadOnScroll = true;

  selectedCheckboxes: string[] = [];

  selectedDocPath: string = '';

  debounceTimer: any | undefined;

  showLoadingOnScroll = false;


  prevoiusCollection: Collection = { id: 0, name: '' };

  first: number = 0;
  rows: number = 10;

  private appConfigData: AppConfigData;


  constructor(
    private resultService: ResultService,
    private dWayService: DWayService,
    private router: Router,
    private appConfigService: AppConfigService,
    private endecapodService: EndecapodService,
  ) {
    this.appConfigData = new AppConfigData(this.appConfigService.config);
  }

  // ngOnInit(): void {

  //   this.loadOnScroll = this.appConfigData.getLoadOnScroll();


  //   this.resultService.fetchResult();
  //   this.resultService.data$.subscribe((data) => {
  //     const currentCollection = this.resultService.getSelectedCollection();

  //     if (currentCollection && currentCollection !== this.prevoiusCollection) {
  //       this.results = [];
  //       // console.log("current collection:  ", currentCollection);
  //       this.prevoiusCollection = currentCollection;

  //     }

  //     if (this.resultService.getIsFilterChanged()) {
  //       this.results = [];
  //       this.resultService.setIsFilterChanged(false);
  //     }

  //     this.results = this.results.concat(data);
  //     this.totalResultCount = this.resultService.getTotalResultCount();
  //     this.loading = false;
  //   });

  //   // this.resultService.loading$.subscribe((loading) => {
  //   //   this.loading = loading;
  //   // });
  // }





  ngOnInit(): void {

    this.loadOnScroll = this.appConfigData.getLoadOnScroll();

    if (this.loadOnScroll) this.showLoadingOnScroll = true;
    else this.showLoadingOnScroll = false;

    this.resultService.fetchResult();

    this.endecapodService.Result()
      .subscribe((res) => {
        if (res instanceof SearchResult) {
          const currentCollection = this.resultService.getSelectedCollection();
          if (currentCollection && currentCollection !== this.prevoiusCollection) {
            this.records = [];

            this.prevoiusCollection = currentCollection;
          }

          if (this.resultService.getIsFilterChanged()) {
            this.records = [];
            this.resultService.setIsFilterChanged(false);
          }

          this.records = this.records.concat(res.getRecords());
          this.totalResultCount = res.getNumAggrRecs();
          this.loading = false;

        }

      });

    // this.resultService.data$.subscribe((data) => {
    //   const currentCollection = this.resultService.getSelectedCollection();

    //   if (currentCollection && currentCollection !== this.prevoiusCollection) {
    //     this.records = [];
    //     // console.log("current collection:  ", currentCollection);
    //     this.prevoiusCollection = currentCollection;

    //   }

    //   if (this.resultService.getIsFilterChanged()) {
    //     this.records = [];
    //     this.resultService.setIsFilterChanged(false);
    //   }

    //   this.records = this.records.concat(data);
    //   console.log("🚀 ~ file: results.component.ts:120 ~ ResultsComponent ~ this.resultService.data$.subscribe ~ this.records:", this.records)
    //   this.totalResultCount = this.resultService.getTotalResultCount();
    //   this.loading = false;
    // });

    // this.resultService.loading$.subscribe((loading) => {
    //   this.loading = loading;
    // });
  }

  // onShowDoc(docPath: string) {
  //   this.dWayService.setDocURL(docPath);
  // }

  onShowDoc(selectedDoc: any) {
    this.selectedRecord = selectedDoc;
    this.selectedDocPath = selectedDoc.records[0].properties.relative_path;
  }

  // onCheckboxChange(result: any) {
  //   if (result.checked) {
  //     this.selectedCheckboxes.push(result.relative_path);

  //   } else {
  //     const index = this.selectedCheckboxes.indexOf(result.relative_path);
  //     if (index !== -1) {
  //       this.selectedCheckboxes.splice(index, 1);
  //     }
  //   }
  // }

  onCheckboxChange(record: any) {

    if (record.records[0].properties.checked) {
      this.selectedCheckboxes.push(record.records[0].properties.relative_path);
      this.checkedRecord = record;
    } else {
      const index = this.selectedCheckboxes.indexOf(record.records[0].properties.relative_path);
      if (index !== -1) {
        this.selectedCheckboxes.splice(index, 1);
      }
    }
  }

  onViewBtnClick() {
    if (this.selectedCheckboxes.length === 1) {
      const selectedPath = this.selectedCheckboxes[0];
      // this.dWayService.setDocURL(selectedPath);
      this.router.navigate(['document'], { queryParams: { url: selectedPath } });
    }
  }

  onPdfBtnClick() {

    if (this.selectedCheckboxes.length === 1) {
      const selectedPath = this.selectedCheckboxes[0];
      this.dWayService.setDocURL(selectedPath);
      this.router.navigate(['print']);
    }



  }




  onPageChange(event: PageEvent) {
    this.first = event.first;
    this.resultService.setOffset(this.first);
    this.rows = event.rows;
  }



  @HostListener('window:scroll', ['$event'])
  onScroll(event: any): void {
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }

    this.debounceTimer = setTimeout(() => {
      if (this.loadOnScroll) {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
          this.onLoadMore();
        }
      }
      this.showLoadingOnScroll = false;
    }, 50);
  }



  onLoadMore() {
    if (!this.loading) {
      this.showLoadingOnScroll = true;
      this.first = this.first + this.rows;
      this.resultService.setOffset(this.first);
    }
  }

}
