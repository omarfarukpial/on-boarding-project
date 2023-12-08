import { Component, OnInit } from '@angular/core';
import { DWayService } from 'src/app/services/d-way.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-doc-show',
  templateUrl: './doc-show.component.html',
  styleUrls: ['./doc-show.component.css'],
  providers: [DWayService]
})
export class DocShowComponent implements OnInit {

  documentData: any;
  documentHtml: any;
  documentTitle: string;


  showTopicDiv: boolean = true;
  showOutlineDiv: boolean = false;

  constructor(
    private dWayService: DWayService,
    private location: Location
  ) {
  }

  ngOnInit(): void {
    this.dWayService.LoadDocument()
      .subscribe(
        (response) => {
          this.documentData = JSON.parse(response.body);
          console.log("🚀 ~ file: doc-show.component.ts:28 ~ DocShowComponent ~ ngOnInit ~ this.documentData:", this.documentData)
          this.documentHtml = this.documentData.body;
          this.documentTitle = this.documentData.title;
        }
      );
  }


  showTopic() {
    this.showTopicDiv = true;
    this.showOutlineDiv = false;
  }

  showOutline() {
    this.showTopicDiv = false;
    this.showOutlineDiv = true;
  }



  goBack() {
    this.location.back();
  }

}
