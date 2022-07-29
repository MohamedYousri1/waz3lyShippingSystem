import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowMovementComponent } from './show-movement.component';

describe('ShowMovementComponent', () => {
  let component: ShowMovementComponent;
  let fixture: ComponentFixture<ShowMovementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowMovementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowMovementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
