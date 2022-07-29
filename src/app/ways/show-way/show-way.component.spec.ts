import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowWayComponent } from './show-way.component';

describe('ShowWayComponent', () => {
  let component: ShowWayComponent;
  let fixture: ComponentFixture<ShowWayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowWayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowWayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
