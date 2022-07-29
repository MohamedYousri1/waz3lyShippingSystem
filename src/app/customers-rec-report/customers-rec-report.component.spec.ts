import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersRecReportComponent } from './customers-rec-report.component';

describe('CustomersRecReportComponent', () => {
  let component: CustomersRecReportComponent;
  let fixture: ComponentFixture<CustomersRecReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomersRecReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomersRecReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
