import { TestBed } from '@angular/core/testing';

import { DWayService } from './d-way.service';

describe('DWayService', () => {
  let service: DWayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DWayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
