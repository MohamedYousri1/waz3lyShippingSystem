import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAddClientTypeComponent } from './edit-add-client-type.component';

describe('EditAddClientTypeComponent', () => {
  let component: EditAddClientTypeComponent;
  let fixture: ComponentFixture<EditAddClientTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAddClientTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAddClientTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
