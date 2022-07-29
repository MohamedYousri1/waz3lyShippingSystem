import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiveStatusesComponent } from './receive-statuses.component';

describe('ReceiveStatusesComponent', () => {
  let component: ReceiveStatusesComponent;
  let fixture: ComponentFixture<ReceiveStatusesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReceiveStatusesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceiveStatusesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
