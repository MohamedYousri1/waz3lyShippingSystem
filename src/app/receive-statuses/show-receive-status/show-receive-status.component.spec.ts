import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowReceiveStatusComponent } from './show-receive-status.component';

describe('ShowReceiveStatusComponent', () => {
  let component: ShowReceiveStatusComponent;
  let fixture: ComponentFixture<ShowReceiveStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowReceiveStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowReceiveStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
