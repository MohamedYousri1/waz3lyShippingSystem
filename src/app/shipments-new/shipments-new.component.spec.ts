import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipmentsNewComponent } from './shipments-new.component';

describe('ShipmentsNewComponent', () => {
  let component: ShipmentsNewComponent;
  let fixture: ComponentFixture<ShipmentsNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShipmentsNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipmentsNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
