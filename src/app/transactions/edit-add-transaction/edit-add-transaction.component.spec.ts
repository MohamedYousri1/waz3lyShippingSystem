import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAddTransactionComponent } from './edit-add-transaction.component';

describe('EditAddTransactionComponent', () => {
  let component: EditAddTransactionComponent;
  let fixture: ComponentFixture<EditAddTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAddTransactionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAddTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
