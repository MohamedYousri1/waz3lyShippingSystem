import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RateTypesComponent } from './rate-types.component';

describe('RateTypesComponent', () => {
  let component: RateTypesComponent;
  let fixture: ComponentFixture<RateTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RateTypesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RateTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
