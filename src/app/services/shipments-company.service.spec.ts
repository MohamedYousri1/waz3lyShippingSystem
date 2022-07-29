import { TestBed } from '@angular/core/testing';

import { ShipmentsCompanyService } from './shipments-company.service';

describe('ShipmentsCompanyService', () => {
  let service: ShipmentsCompanyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShipmentsCompanyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
