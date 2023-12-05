import { TestBed } from '@angular/core/testing';

import { ExposeService } from './expose.service';

describe('ExposeService', () => {
  let service: ExposeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExposeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
