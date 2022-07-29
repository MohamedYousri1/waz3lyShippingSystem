import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAddChildComponent } from './edit-add-child.component';

describe('EditAddChildComponent', () => {
  let component: EditAddChildComponent;
  let fixture: ComponentFixture<EditAddChildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAddChildComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAddChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
