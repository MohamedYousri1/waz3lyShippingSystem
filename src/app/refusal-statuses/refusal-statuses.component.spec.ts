import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefusalStatusesComponent } from './refusal-statuses.component';

describe('RefusalStatusesComponent', () => {
  let component: RefusalStatusesComponent;
  let fixture: ComponentFixture<RefusalStatusesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RefusalStatusesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RefusalStatusesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
