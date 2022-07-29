import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAddCouponComponent } from './edit-add-coupon.component';

describe('EditAddCouponComponent', () => {
  let component: EditAddCouponComponent;
  let fixture: ComponentFixture<EditAddCouponComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAddCouponComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAddCouponComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
