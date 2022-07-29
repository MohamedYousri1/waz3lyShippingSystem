import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubStatesComponent } from './sub-states.component';

describe('SubStatesComponent', () => {
  let component: SubStatesComponent;
  let fixture: ComponentFixture<SubStatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubStatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubStatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
