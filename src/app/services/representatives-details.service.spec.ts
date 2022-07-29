import { TestBed } from '@angular/core/testing';

import { RepresentativesDetailsService } from './representatives-details.service';

describe('RepresentativesDetailsService', () => {
  let service: RepresentativesDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RepresentativesDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
