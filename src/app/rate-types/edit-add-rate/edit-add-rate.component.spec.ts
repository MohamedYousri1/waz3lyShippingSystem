import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAddRateComponent } from './edit-add-rate.component';

describe('EditAddRateComponent', () => {
  let component: EditAddRateComponent;
  let fixture: ComponentFixture<EditAddRateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAddRateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAddRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
