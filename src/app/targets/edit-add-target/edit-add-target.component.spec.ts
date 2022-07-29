import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAddTargetComponent } from './edit-add-target.component';

describe('EditAddTargetComponent', () => {
  let component: EditAddTargetComponent;
  let fixture: ComponentFixture<EditAddTargetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAddTargetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAddTargetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
