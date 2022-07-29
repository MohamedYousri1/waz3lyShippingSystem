import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowSubStateComponent } from './show-sub-state.component';

describe('ShowSubStateComponent', () => {
  let component: ShowSubStateComponent;
  let fixture: ComponentFixture<ShowSubStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowSubStateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowSubStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
