import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowRateComponent } from './show-rate.component';

describe('ShowRateComponent', () => {
  let component: ShowRateComponent;
  let fixture: ComponentFixture<ShowRateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowRateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
