import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipmentTypesComponent } from './shipment-types.component';

describe('ShipmentTypesComponent', () => {
  let component: ShipmentTypesComponent;
  let fixture: ComponentFixture<ShipmentTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShipmentTypesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipmentTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
