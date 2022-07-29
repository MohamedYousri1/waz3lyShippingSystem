import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAddGradComponent } from './edit-add-grad.component';

describe('EditAddGradComponent', () => {
  let component: EditAddGradComponent;
  let fixture: ComponentFixture<EditAddGradComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAddGradComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAddGradComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
