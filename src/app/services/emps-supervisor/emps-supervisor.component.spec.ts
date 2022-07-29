import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpsSupervisorComponent } from './emps-supervisor.component';

describe('EmpsSupervisorComponent', () => {
  let component: EmpsSupervisorComponent;
  let fixture: ComponentFixture<EmpsSupervisorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpsSupervisorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpsSupervisorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
