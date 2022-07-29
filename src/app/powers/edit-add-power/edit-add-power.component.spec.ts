import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAddPowerComponent } from './edit-add-power.component';

describe('EditAddPowerComponent', () => {
  let component: EditAddPowerComponent;
  let fixture: ComponentFixture<EditAddPowerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAddPowerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAddPowerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
