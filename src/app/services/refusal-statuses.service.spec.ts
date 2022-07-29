import { TestBed } from '@angular/core/testing';

import { RefusalStatusesService } from './refusal-statuses.service';

describe('RefusalStatusesService', () => {
  let service: RefusalStatusesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RefusalStatusesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
