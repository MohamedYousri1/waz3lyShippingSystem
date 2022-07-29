import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAddWayComponent } from './edit-add-way.component';

describe('EditAddWayComponent', () => {
  let component: EditAddWayComponent;
  let fixture: ComponentFixture<EditAddWayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAddWayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAddWayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
