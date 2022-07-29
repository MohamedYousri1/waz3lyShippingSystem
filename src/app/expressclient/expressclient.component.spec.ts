import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpressclientComponent } from './expressclient.component';

describe('ExpressclientComponent', () => {
  let component: ExpressclientComponent;
  let fixture: ComponentFixture<ExpressclientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpressclientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpressclientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
