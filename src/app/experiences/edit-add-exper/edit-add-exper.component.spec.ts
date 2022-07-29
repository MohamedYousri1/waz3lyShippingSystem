import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAddExperComponent } from './edit-add-exper.component';

describe('EditAddExperComponent', () => {
  let component: EditAddExperComponent;
  let fixture: ComponentFixture<EditAddExperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAddExperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAddExperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
