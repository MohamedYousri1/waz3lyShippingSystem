import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAddRefusalStatusesComponent } from './edit-add-refusal-statuses.component';

describe('EditAddRefusalStatusesComponent', () => {
  let component: EditAddRefusalStatusesComponent;
  let fixture: ComponentFixture<EditAddRefusalStatusesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAddRefusalStatusesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAddRefusalStatusesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
