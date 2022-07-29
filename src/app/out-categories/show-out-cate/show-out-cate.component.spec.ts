import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowOutCateComponent } from './show-out-cate.component';

describe('ShowOutCateComponent', () => {
  let component: ShowOutCateComponent;
  let fixture: ComponentFixture<ShowOutCateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowOutCateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowOutCateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
