import { Component, OnInit } from '@angular/core';
import { Collection } from 'src/app/model/data/collection';
import { Country } from 'src/app/model/data/country';
import { RelatedCountry } from 'src/app/model/data/relatedCountry';
import { ResultService } from 'src/app/services/result.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {

  constructor(private resultService: ResultService) {}

  ngOnInit(): void {
  }
}
