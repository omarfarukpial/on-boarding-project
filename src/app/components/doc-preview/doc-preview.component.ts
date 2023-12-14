import { Component, Input, OnInit, SimpleChange } from '@angular/core';
import { Router } from '@angular/router';
import { EndecapodService, EneRecord } from '@ibfd/endecapod';
import { TopicConfig } from '@ibfd/topicsearch';
import { AppConfigData } from 'src/app/model/config/app-config-data';
import { AppConfigService } from 'src/app/services/app-config.service';
import { DWayService } from 'src/app/services/d-way.service';

@Component({
  selector: 'app-doc-preview',
  templateUrl: './doc-preview.component.html',
  styleUrls: ['./doc-preview.component.css'],
  providers: [DWayService, EndecapodService]
})
export class DocPreviewComponent implements OnInit {

  @Input()
  docUrl: string;

  @Input()
  selectedRecords: EneRecord[];

  documentData: any;
  previewShow: boolean = false;

  showDocumentPreviewDiv: boolean = true;
  showTopicPreviewDiv: boolean = false;
  showOutlinePreviewDiv: boolean = false;



  topicConfigs: TopicConfig[] = [];

  appConfigData: AppConfigData;



  constructor(
    private dWayService: DWayService,
    private router: Router,
    private appConfigService: AppConfigService,
  ) { }

  ngOnInit(): void {
    this.appConfigData = new AppConfigData(this.appConfigService.config);
    this.topicConfigs = this.appConfigData.getTopicFeatureConfig().getTopicNavigationConfig().getEnabledTaxonomies();

  }


  ngOnChanges(changes: SimpleChange) {
    if (changes['docUrl'] && !changes['docUrl'].firstChange) {
      this.dWayService.LoadDocumentByUrl(this.docUrl)
        .subscribe(
          (response) => {
            this.documentData = JSON.parse(response.body);
            this.previewShow = true;


          }
        );
    }
  }

  onOutlineItemClick(id: string) {
    id = id.replace(/^#/, "");
    // this.router.navigate(['document'], { queryParams: { url: this.docUrl }, fragment: id });
    this.router.navigate(['document'], { queryParams: { url: this.docUrl } });

  }


  showDocumentPreview() {
    this.showDocumentPreviewDiv = true;
    this.showTopicPreviewDiv = false;
    this.showOutlinePreviewDiv = false;
  }

  showTopicPreview() {
    this.showDocumentPreviewDiv = false;
    this.showTopicPreviewDiv = true;
    this.showOutlinePreviewDiv = false;
  }

  showOutlinePreview() {
    this.showDocumentPreviewDiv = false;
    this.showTopicPreviewDiv = false;
    this.showOutlinePreviewDiv = true;
  }

}
