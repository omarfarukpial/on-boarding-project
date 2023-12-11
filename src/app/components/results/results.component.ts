import { Component, HostListener, Injectable, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppConfigData } from 'src/app/model/config/app-config-data';
import { AppConfigService } from 'src/app/services/app-config.service';
import { DWayService } from 'src/app/services/d-way.service';
import { ResultService } from 'src/app/services/result.service';


@Injectable()
export class MoreResultsService extends ResultService { }


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
  providers: [MoreResultsService],
})
export class ResultsComponent implements OnInit {

  results: any[] = [];
  moreResults: any[] = [];

  totalResultCount: number;
  loading = true;
  isResultExists = true;

  loadOnScroll = true;

  selectedCheckboxes: string[] = [];

  selectedDocPath: string = '';

  debounceTimer: any | undefined;

  showLoadingOnScroll = false;

  first: number = 0;
  rows: number = 10;

  private appConfigData: AppConfigData;


  constructor(
    private resultService: ResultService,
    private dWayService: DWayService,
    private router: Router,
    private appConfigService: AppConfigService,
    private moreResultsService: MoreResultsService,
  ) {
    this.appConfigData = new AppConfigData(this.appConfigService.config);
  }

  ngOnInit(): void {

    this.loadOnScroll = this.appConfigData.getLoadOnScroll();
    this.resultService.fetchResult();
    // this.resultService.setOffset(0);
    this.resultService.data$.subscribe((data) => {
      this.results = data;
      // this.results = this.results.concat(data);
      this.totalResultCount = this.resultService.getTotalResultCount();
      this.loading = false;
      this.moreResults = [];
    });

    // this.resultService.loading$.subscribe((loading) => {
    //   this.loading = loading;
    // });
  }

  // onShowDoc(docPath: string) {
  //   this.dWayService.setDocURL(docPath);
  // }

  onShowDoc(docPath: string) {
    this.selectedDocPath = docPath;
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
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 &&
        this.loadOnScroll
      ) {
        this.showLoadingOnScroll = true;
        this.onLoadMore();
      }
    }, 200);

    this.showLoadingOnScroll = false;
  }


  onLoadMore() {
    this.showLoadingOnScroll = true;
    this.first = this.first + this.rows;
    // this.resultService.setOffset(this.first);
    this.resultService.setOffset(this.first);
    this.resultService.fetchMoreResult();
    this.resultService.moreData$.subscribe((data) => {
      this.moreResults = this.moreResults.concat(data);
    });
  }

}
