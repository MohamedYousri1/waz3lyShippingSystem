import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideImgsComponent } from './slide-imgs.component';

describe('SlideImgsComponent', () => {
  let component: SlideImgsComponent;
  let fixture: ComponentFixture<SlideImgsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SlideImgsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SlideImgsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
