import { TestBed } from '@angular/core/testing';

import { BackshipmentsService } from './backshipments.service';

describe('BackshipmentsService', () => {
  let service: BackshipmentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BackshipmentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
