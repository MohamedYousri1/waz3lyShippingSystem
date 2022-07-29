import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowProvComponent } from './show-prov.component';

describe('ShowProvComponent', () => {
  let component: ShowProvComponent;
  let fixture: ComponentFixture<ShowProvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowProvComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowProvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
