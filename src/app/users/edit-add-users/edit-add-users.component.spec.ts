import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAddUsersComponent } from './edit-add-users.component';

describe('EditAddUsersComponent', () => {
  let component: EditAddUsersComponent;
  let fixture: ComponentFixture<EditAddUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAddUsersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAddUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
