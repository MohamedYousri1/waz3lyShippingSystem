import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAddQualificationComponent } from './edit-add-qualification.component';

describe('EditAddQualificationComponent', () => {
  let component: EditAddQualificationComponent;
  let fixture: ComponentFixture<EditAddQualificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAddQualificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAddQualificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
