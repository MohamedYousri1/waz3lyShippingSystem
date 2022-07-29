import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAddCateComponent } from './edit-add-cate.component';

describe('EditAddCateComponent', () => {
  let component: EditAddCateComponent;
  let fixture: ComponentFixture<EditAddCateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAddCateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAddCateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
