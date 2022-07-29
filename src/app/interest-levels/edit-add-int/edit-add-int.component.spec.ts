import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAddIntComponent } from './edit-add-int.component';

describe('EditAddIntComponent', () => {
  let component: EditAddIntComponent;
  let fixture: ComponentFixture<EditAddIntComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAddIntComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAddIntComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
