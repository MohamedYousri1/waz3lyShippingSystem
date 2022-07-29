import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackshipmentsComponent } from './backshipments.component';

describe('BackshipmentsComponent', () => {
  let component: BackshipmentsComponent;
  let fixture: ComponentFixture<BackshipmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackshipmentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BackshipmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
