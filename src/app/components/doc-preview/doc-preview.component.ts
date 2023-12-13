import { Component, Input, OnInit, SimpleChange } from '@angular/core';
import { Router } from '@angular/router';
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

  @Input()
  selectedDoc: any;

  documentData: any;
  previewShow: boolean = false;

  showDocumentPreviewDiv: boolean = true;
  showTopicPreviewDiv: boolean = false;
  showOutlinePreviewDiv: boolean = false;


  constructor(
    private dWayService: DWayService,
    private router: Router
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

            console.log("🚀 ~ file: doc-preview.component.ts:44 ~ DocPreviewComponent ~ ngOnChanges ~ this.selectedDoc:", this.selectedDoc)

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
