import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowClientTypesComponent } from './show-client-types.component';

describe('ShowClientTypesComponent', () => {
  let component: ShowClientTypesComponent;
  let fixture: ComponentFixture<ShowClientTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowClientTypesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowClientTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
