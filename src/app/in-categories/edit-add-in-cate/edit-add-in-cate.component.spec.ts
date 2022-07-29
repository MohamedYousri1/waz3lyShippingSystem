import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAddInCateComponent } from './edit-add-in-cate.component';

describe('EditAddInCateComponent', () => {
  let component: EditAddInCateComponent;
  let fixture: ComponentFixture<EditAddInCateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAddInCateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAddInCateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
