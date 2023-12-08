import { Component, Input, OnInit, SimpleChange } from '@angular/core';
import { DWayService } from 'src/app/services/d-way.service';

@Component({
  selector: 'app-doc-preview',
  templateUrl: './doc-preview.component.html',
  styleUrls: ['./doc-preview.component.css'],
  providers: [DWayService]
})
export class DocPreviewComponent implements OnInit {

  @Input()
  docUrl: string;

  documentData: any;
  previewShow: boolean = false;

  showDocumentPreviewDiv: boolean = true;
  showTopicPreviewDiv: boolean = false;
  showOutlinePreviewDiv: boolean = false;


  constructor(
    private dWayService: DWayService,
  ) { }

  ngOnInit(): void {
  }


  ngOnChanges(changes: SimpleChange) {
    if (changes['docUrl'] && !changes['docUrl'].firstChange) {
      this.dWayService.LoadDocumentByUrl(this.docUrl)
        .subscribe(
          (response) => {
            this.documentData = JSON.parse(response.body);
            this.previewShow = true;

            console.log("🚀 ~ file: doc-preview.component.ts:26 ~ DocPreviewComponent ~ ngOnInit ~ this.documentData:", this.documentData)

          }
        );
    }
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
