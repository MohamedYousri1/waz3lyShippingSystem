import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingShipmentsComponent } from './pending-shipments.component';

describe('PendingShipmentsComponent', () => {
  let component: PendingShipmentsComponent;
  let fixture: ComponentFixture<PendingShipmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingShipmentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingShipmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
