import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatedCountriesComponent } from './related-countries.component';

describe('RelatedCountriesComponent', () => {
  let component: RelatedCountriesComponent;
  let fixture: ComponentFixture<RelatedCountriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RelatedCountriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatedCountriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
