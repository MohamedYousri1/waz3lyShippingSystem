import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAddReceiveStatusComponent } from './edit-add-receive-status.component';

describe('EditAddReceiveStatusComponent', () => {
  let component: EditAddReceiveStatusComponent;
  let fixture: ComponentFixture<EditAddReceiveStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAddReceiveStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAddReceiveStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
