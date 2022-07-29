import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAddOutChildComponent } from './edit-add-out-child.component';

describe('EditAddOutChildComponent', () => {
  let component: EditAddOutChildComponent;
  let fixture: ComponentFixture<EditAddOutChildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAddOutChildComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAddOutChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
