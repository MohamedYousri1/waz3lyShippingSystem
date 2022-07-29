import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowStateComponent } from './show-state.component';

describe('ShowStateComponent', () => {
  let component: ShowStateComponent;
  let fixture: ComponentFixture<ShowStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowStateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
