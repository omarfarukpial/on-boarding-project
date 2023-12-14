import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { DWayService } from 'src/app/services/d-way.service';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { TopicConfig, TopicService, TopicServiceConfig } from '@ibfd/topicsearch';
import { AppConfigService } from 'src/app/services/app-config.service';
import { AppConfigData } from 'src/app/model/config/app-config-data';
import { filter } from 'rxjs';
import { TreeNode } from 'primeng/api';
import { EndecapodService, EneRecord, SearchResult } from '@ibfd/endecapod';
import { ResultService } from 'src/app/services/result.service';


@Component({
  selector: 'app-doc-show',
  templateUrl: './doc-show.component.html',
  styleUrls: ['./doc-show.component.css'],
  providers: [DWayService, EndecapodService]
})
export class DocShowComponent implements OnInit {

  documentData: any;
  documentHtml: any;
  documentTitle: string;

  urlParameter: string;

  showTopicDiv: boolean = true;
  showOutlineDiv: boolean = false;

  docURL: string = "";

  docTopicList: any[] = [];

  topicConfigs: TopicConfig[] = [];

  appConfigData: AppConfigData;

  docTopicTree: TreeNode[];

  taxtopicRecords: EneRecord[];











  constructor(
    private dWayService: DWayService,
    private location: Location,
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer,
    private appConfigService: AppConfigService,
    private documentfindService: EndecapodService,
    private resultService: ResultService
  ) {
    this.appConfigData = new AppConfigData(this.appConfigService.config);
    this.topicConfigs = this.appConfigData.getTopicFeatureConfig().getTopicNavigationConfig().getEnabledTaxonomies();
    console.log("🚀 ~ file: doc-show.component.ts:50 ~ DocShowComponent ~ this.topicConfigs:", this.topicConfigs)
  }

  ngOnInit(): void {



    this.route.queryParams.subscribe(params => {
      this.urlParameter = params['url'];
    });


    this.dWayService.setDocURL(this.urlParameter);

    this.taxtopicRecords = this.resultService.getCheckedRecord();





    this.dWayService.LoadDocument()
      .subscribe(
        (response) => {
          this.documentData = JSON.parse(response.body);
          console.log("🚀 ~ file: doc-show.component.ts:100 ~ DocShowComponent ~ ngOnInit ~ this.documentData:", this.documentData)
          this.documentHtml = this.documentData.body;
          this.documentTitle = this.documentData.title;
          this.scrollToFragment();
        }
      );


    // this.loadDocTopicList();



    // this.documentfindService.setName("documentfind");
    // this.documentfindService.setURL(this.appConfigData.getEndecapodURL(), this.appConfigData.getAwareURL());

    // this.documentfindService.Result()
    //   .pipe(filter(res => !!res))
    //   .subscribe((res: SearchResult) => {
    //     console.log("🚀 ~ file: doc-show.component.ts:112 ~ DocShowComponent ~ .subscribe ~ res:", res)

    //   });






  }

  scrollToFragment() {
    this.route.fragment.subscribe(fragment => {
      if (fragment) {
        const element = document.getElementById(fragment);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
        }

      }
    });
  }



  // loadDocTopicList() {
  //   const topicServiceConf = new TopicServiceConfig(
  //     this.appConfigData.getEndecapodURL(), this.appConfigData.getAwareURL(), this.topicConfigs[0], this.appConfigData.getSuppressedChips()
  //   );

  //   this.topicService.registerConfig(topicServiceConf);
  //   this.topicService.loadInitTaxTopics();

  //   console.log("1----------------------------->");

  //   this.topicService.getDocTopicTree().pipe()
  //     .subscribe(
  //       {
  //         next: (docTopicTree) => {
  //           console.log("2----------------------------->");
  //           this.docTopicList = docTopicTree;
  //         }
  //       }
  //     );

  //   console.log("3----------------------------->");




  // }

  onTopicTreeBuild(topicTree) {
    this.docTopicTree = topicTree;
  }


  showTopic() {
    this.showTopicDiv = true;
    this.showOutlineDiv = false;
  }

  showOutline() {
    this.showTopicDiv = false;
    this.showOutlineDiv = true;
  }

  scrollToView(id: string) {
    id = id.replace(/^#/, "");
    this.router.navigate(['document'], { queryParams: { url: this.urlParameter }, fragment: id });
  }

  sanitize(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }



  goBack() {
    this.location.back();
  }

}
