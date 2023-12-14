import { Component, Input, OnInit, Output } from '@angular/core';
import { EneRecord, SearchResult } from '@ibfd/endecapod';
import { TopicConfig, TopicService, TopicServiceConfig } from '@ibfd/topicsearch';
import { TreeNode } from 'primeng/api';
import { filter } from 'rxjs';
import { AppConfigData } from 'src/app/model/config/app-config-data';
import { AppConfigService } from 'src/app/services/app-config.service';
import { EventEmitter } from 'stream';

interface TopicRecordLinks {
  [topicLabel: string]: string[];
}

@Component({
  selector: 'app-doc-topic',
  templateUrl: './doc-topic.component.html',
  styleUrls: ['./doc-topic.component.css'],
  providers: [TopicService]
})
export class DocTopicComponent implements OnInit {


  @Input()
  topicConfig: TopicConfig;
  docTopicTree: TreeNode[];


  topics: any[] = [];


  @Input()
  records: EneRecord[];

  private topicRecordLinks: TopicRecordLinks = {};




  // @Output()
  // docTopicTreeBuild: EventEmitter<TreeNode[]> = new EventEmitter();


  private appConfigData: AppConfigData;

  constructor(
    private topicService: TopicService,
    private appConfigService: AppConfigService,
  ) {
    this.appConfigData = new AppConfigData(this.appConfigService.config);
  }

  ngOnInit(): void {


    const topicServiceConfig = new TopicServiceConfig(
      this.appConfigData.getEndecapodURL(), this.appConfigData.getAwareURL(), this.topicConfig, this.appConfigData.getSuppressedChips()
    );











    this.topicService.registerConfig(topicServiceConfig);
    this.topicService.loadInitTaxTopics();

    this.topicService.getDocTopicTree()
      .pipe(filter(res => !!res))
      .subscribe({
        next: res => {
          console.log(" topic -----------> ", res);
          this.topics = res;

        },
        error: err => {
          console.error("Error in subscription:", err);
        },
        complete: () => {
          console.log("Subscription complete.");
        }

      });




    const topicLinks = this.records.reduce((acc, r) => {
      if (!!r.properties[SearchResult.EDCA_PROP_RELATION_REFS]) {
        acc.push(...r.properties[SearchResult.EDCA_PROP_RELATION_REFS]);
      }
      return acc;
    }, [])
      .sort()
      .filter(v => v.match(new RegExp(`^${this.topicConfig.prefix || ''}\/[0-9_]+\/.*`)));


    this.topicRecordLinks = this.getTopicRecordsLinks(topicLinks);
    this.topicService.buildDocTopicTree([...Object.keys(this.topicRecordLinks)]);






  }


  private getTopicRecordsLinks(topicLinks: string[]): TopicRecordLinks {
    const refineLink = (link) => link.replace(new RegExp(`^${this.topicConfig.prefix || ''}/`), '');
    const extractInfo = (link) => link.split('/').filter(i => !!i).map(i => i.trim());
    const topicRecordLinks = {};

    topicLinks.map(refineLink)
      .map(extractInfo)
      .forEach(([topicLabel, uid, title]) => {
        const item = { uid, title };
        if (!topicRecordLinks[topicLabel]) {
          topicRecordLinks[topicLabel] = [];
        }
        topicRecordLinks[topicLabel] = [...topicRecordLinks[topicLabel], item];
      });

    return topicRecordLinks;
  }

}
