import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocTopicComponent } from './doc-topic.component';

describe('DocTopicComponent', () => {
  let component: DocTopicComponent;
  let fixture: ComponentFixture<DocTopicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocTopicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocTopicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
