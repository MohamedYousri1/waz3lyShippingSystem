import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StorageShipmentsComponent } from './storage-shipments.component';

describe('StorageShipmentsComponent', () => {
  let component: StorageShipmentsComponent;
  let fixture: ComponentFixture<StorageShipmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StorageShipmentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StorageShipmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
