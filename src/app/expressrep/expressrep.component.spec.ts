import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpressrepComponent } from './expressrep.component';

describe('ExpressrepComponent', () => {
  let component: ExpressrepComponent;
  let fixture: ComponentFixture<ExpressrepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpressrepComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpressrepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
