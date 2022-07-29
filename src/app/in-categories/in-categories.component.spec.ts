import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InCategoriesComponent } from './in-categories.component';

describe('InCategoriesComponent', () => {
  let component: InCategoriesComponent;
  let fixture: ComponentFixture<InCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InCategoriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
