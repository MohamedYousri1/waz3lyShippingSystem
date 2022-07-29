import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAddMovementComponent } from './edit-add-movement.component';

describe('EditAddMovementComponent', () => {
  let component: EditAddMovementComponent;
  let fixture: ComponentFixture<EditAddMovementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAddMovementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAddMovementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
