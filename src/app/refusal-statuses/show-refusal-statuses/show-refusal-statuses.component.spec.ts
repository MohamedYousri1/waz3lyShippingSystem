import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowRefusalStatusesComponent } from './show-refusal-statuses.component';

describe('ShowRefusalStatusesComponent', () => {
  let component: ShowRefusalStatusesComponent;
  let fixture: ComponentFixture<ShowRefusalStatusesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowRefusalStatusesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowRefusalStatusesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
