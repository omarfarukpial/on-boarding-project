import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocOutlineComponent } from './doc-outline.component';

describe('DocOutlineComponent', () => {
  let component: DocOutlineComponent;
  let fixture: ComponentFixture<DocOutlineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocOutlineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocOutlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
