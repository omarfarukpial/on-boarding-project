import { Component, Injectable, OnInit } from '@angular/core';
import { EndecapodService, SearchResult } from '@ibfd/endecapod';
import { filter } from 'rxjs';
import { DWayService } from 'src/app/services/d-way.service';
import { ResultService } from 'src/app/services/result.service';


interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  results: any[] = [];
  totalResultCount: number;
  loading = true;
  isResultExists = true;

  constructor(
    private resultService: ResultService,
    private dWayService: DWayService
  ) {}

  ngOnInit(): void {
    this.resultService.fetchResult();
    this.resultService.data$.subscribe((data) => {
      this.results = data;
      this.totalResultCount = this.resultService.getTotalResultCount();
      this.loading = false;
    });

    this.resultService.loading$.subscribe((loading) => {
      this.loading = loading;
    });
  }

  onShowDoc(docPath: string) {
    this.dWayService.setDocURL(docPath);
  }
  


  first: number = 0;
  rows: number = 10;
  onPageChange(event: PageEvent) {
      this.first = event.first;
      this.resultService.setOffset(this.first);
      this.rows = event.rows;
  }

}
