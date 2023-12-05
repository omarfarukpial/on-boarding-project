import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocShowComponent } from './doc-show.component';

describe('DocShowComponent', () => {
  let component: DocShowComponent;
  let fixture: ComponentFixture<DocShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocShowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
