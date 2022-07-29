import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipmentProductComponent } from './shipment-product.component';

describe('ShipmentProductComponent', () => {
  let component: ShipmentProductComponent;
  let fixture: ComponentFixture<ShipmentProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShipmentProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipmentProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
