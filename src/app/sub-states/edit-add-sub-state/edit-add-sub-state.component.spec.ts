import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAddSubStateComponent } from './edit-add-sub-state.component';

describe('EditAddSubStateComponent', () => {
  let component: EditAddSubStateComponent;
  let fixture: ComponentFixture<EditAddSubStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAddSubStateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAddSubStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
