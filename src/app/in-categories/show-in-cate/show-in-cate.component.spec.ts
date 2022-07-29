import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowInCateComponent } from './show-in-cate.component';

describe('ShowInCateComponent', () => {
  let component: ShowInCateComponent;
  let fixture: ComponentFixture<ShowInCateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowInCateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowInCateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
