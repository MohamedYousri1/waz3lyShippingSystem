import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowGradComponent } from './show-grad.component';

describe('ShowGradComponent', () => {
  let component: ShowGradComponent;
  let fixture: ComponentFixture<ShowGradComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowGradComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowGradComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
