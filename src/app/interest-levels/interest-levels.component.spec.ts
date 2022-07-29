import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterestLevelsComponent } from './interest-levels.component';

describe('InterestLevelsComponent', () => {
  let component: InterestLevelsComponent;
  let fixture: ComponentFixture<InterestLevelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InterestLevelsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InterestLevelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
