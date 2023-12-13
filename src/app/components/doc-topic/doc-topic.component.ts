import { Component, Input, OnInit, Output } from '@angular/core';
import { TopicConfig, TopicService, TopicServiceConfig } from 'local_modules/topic/dist';
import { TreeNode } from 'primeng/api';
import { filter } from 'rxjs';
import { AppConfigData } from 'src/app/model/config/app-config-data';
import { AppConfigService } from 'src/app/services/app-config.service';
import { EventEmitter } from 'stream';

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

    console.log(" topicConfig -----------> ", this.topicConfig);

    const topicServiceConfig = new TopicServiceConfig(
      this.appConfigData.getEndecapodURL(), this.appConfigData.getAwareURL(), this.topicConfig, this.appConfigData.getSuppressedChips()
    );


    console.log(" topicServiceConfig -----------> ", topicServiceConfig);




    this.topicService.registerConfig(topicServiceConfig);
    this.topicService.loadInitTaxTopics();

    this.topicService.getDocTopicTree()
      .pipe(filter(res => !!res))
      .subscribe({
        next: res => {
          console.log(" topic -----------> ", res);

        },
        error: err => {
          console.error("Error in subscription:", err);
        },
        complete: () => {
          console.log("Subscription complete.");
        }

      });




  }

}
