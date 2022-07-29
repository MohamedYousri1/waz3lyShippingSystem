import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowIntComponent } from './show-int.component';

describe('ShowIntComponent', () => {
  let component: ShowIntComponent;
  let fixture: ComponentFixture<ShowIntComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowIntComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowIntComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
