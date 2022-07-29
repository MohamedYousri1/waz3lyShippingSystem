import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowOutChildComponent } from './show-out-child.component';

describe('ShowOutChildComponent', () => {
  let component: ShowOutChildComponent;
  let fixture: ComponentFixture<ShowOutChildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowOutChildComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowOutChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
