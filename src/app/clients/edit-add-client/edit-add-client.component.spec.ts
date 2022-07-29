import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAddClientComponent } from './edit-add-client.component';

describe('EditAddClientComponent', () => {
  let component: EditAddClientComponent;
  let fixture: ComponentFixture<EditAddClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAddClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAddClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
