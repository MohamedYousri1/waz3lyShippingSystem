import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAddProductStatComponent } from './edit-add-product-stat.component';

describe('EditAddProductStatComponent', () => {
  let component: EditAddProductStatComponent;
  let fixture: ComponentFixture<EditAddProductStatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAddProductStatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAddProductStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
