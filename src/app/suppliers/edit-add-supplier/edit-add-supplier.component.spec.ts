import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAddSupplierComponent } from './edit-add-supplier.component';

describe('EditAddSupplierComponent', () => {
  let component: EditAddSupplierComponent;
  let fixture: ComponentFixture<EditAddSupplierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAddSupplierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAddSupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
