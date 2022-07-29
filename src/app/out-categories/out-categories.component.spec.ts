import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutCategoriesComponent } from './out-categories.component';

describe('OutCategoriesComponent', () => {
  let component: OutCategoriesComponent;
  let fixture: ComponentFixture<OutCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutCategoriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OutCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
