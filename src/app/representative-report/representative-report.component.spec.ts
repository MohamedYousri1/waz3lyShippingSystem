import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepresentativeReportComponent } from './representative-report.component';

describe('RepresentativeReportComponent', () => {
  let component: RepresentativeReportComponent;
  let fixture: ComponentFixture<RepresentativeReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepresentativeReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RepresentativeReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
