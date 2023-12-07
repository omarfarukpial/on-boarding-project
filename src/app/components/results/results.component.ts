import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  selectedCheckboxes: string[] = [];

  constructor(
    private resultService: ResultService,
    private dWayService: DWayService,
    private router: Router
  ) { }

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

  onCheckboxChange(result: any) {
    if (result.checked) {
      this.selectedCheckboxes.push(result.relative_path);
      console.log("lsdfl ", this.selectedCheckboxes);

    } else {
      const index = this.selectedCheckboxes.indexOf(result.relative_path);
      if (index !== -1) {
        this.selectedCheckboxes.splice(index, 1);
      }
    }
  }

  onViewBtnClick() {
    if (this.selectedCheckboxes.length === 1) {
      const selectedPath = this.selectedCheckboxes[0];
      this.dWayService.setDocURL(selectedPath);
      this.router.navigate(['document']);
    }
  }

  onPdfBtnClick() {

    if (this.selectedCheckboxes.length === 1) {
      const selectedPath = this.selectedCheckboxes[0];
      console.log("🚀 ~ file: results.component.ts:78 ~ ResultsComponent ~ onPdfBtnClick ~ selectedPath:", selectedPath)
      this.dWayService.setDocURL(selectedPath);
      this.router.navigate(['print']);
    }



  }



  first: number = 0;
  rows: number = 10;
  onPageChange(event: PageEvent) {
    this.first = event.first;
    this.resultService.setOffset(this.first);
    this.rows = event.rows;
  }

}
