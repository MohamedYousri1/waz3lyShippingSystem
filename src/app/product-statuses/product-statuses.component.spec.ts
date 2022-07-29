import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductStatusesComponent } from './product-statuses.component';

describe('ProductStatusesComponent', () => {
  let component: ProductStatusesComponent;
  let fixture: ComponentFixture<ProductStatusesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductStatusesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductStatusesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
