import { Component, OnInit } from '@angular/core';
import { DWayService } from 'src/app/services/d-way.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-doc-show',
  templateUrl: './doc-show.component.html',
  styleUrls: ['./doc-show.component.css']
})
export class DocShowComponent implements OnInit {

  documentData:any;
  documentHtml:any;
  documentTitle: string;

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
        this.documentHtml = this.documentData.body;
        this.documentTitle = this.documentData.title;
      }
    );
  }

  goBack() {
    this.location.back();
  }

}
