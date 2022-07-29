import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAddStateComponent } from './edit-add-state.component';

describe('EditAddStateComponent', () => {
  let component: EditAddStateComponent;
  let fixture: ComponentFixture<EditAddStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAddStateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAddStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
