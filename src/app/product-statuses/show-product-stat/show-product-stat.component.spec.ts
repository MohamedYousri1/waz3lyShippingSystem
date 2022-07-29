import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowProductStatComponent } from './show-product-stat.component';

describe('ShowProductStatComponent', () => {
  let component: ShowProductStatComponent;
  let fixture: ComponentFixture<ShowProductStatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowProductStatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowProductStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
