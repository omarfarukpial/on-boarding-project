import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DWayService } from 'src/app/services/d-way.service';

@Component({
  selector: 'app-doc-print',
  templateUrl: './doc-print.component.html',
  styleUrls: ['./doc-print.component.css']
})
export class DocPrintComponent implements OnInit {



  documentData: any;
  documentHtml: any;
  documentTitle: string;

  constructor(
    private dWayService: DWayService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.dWayService.LoadDocument()
      .subscribe(
        (response) => {
          this.documentData = JSON.parse(response.body);
          this.documentHtml = this.documentData.body;
          this.documentTitle = this.documentData.title;
          const printWindow = window.open('');
          printWindow.document.write('<html><head><title>' + this.documentTitle + '</title></head><body>');
          printWindow.document.write(this.documentHtml);
          printWindow.document.write('</body></html>');
          printWindow.document.close();
          printWindow.print();
        }
      );


    this.router.navigate(['search']);

  }




}
