import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowExperComponent } from './show-exper.component';

describe('ShowExperComponent', () => {
  let component: ShowExperComponent;
  let fixture: ComponentFixture<ShowExperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowExperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowExperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
