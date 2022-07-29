import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewChildOutComponent } from './view-child-out.component';

describe('ViewChildOutComponent', () => {
  let component: ViewChildOutComponent;
  let fixture: ComponentFixture<ViewChildOutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewChildOutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewChildOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
