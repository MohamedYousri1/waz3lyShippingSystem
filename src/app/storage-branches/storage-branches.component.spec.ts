import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StorageBranchesComponent } from './storage-branches.component';

describe('StorageBranchesComponent', () => {
  let component: StorageBranchesComponent;
  let fixture: ComponentFixture<StorageBranchesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StorageBranchesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StorageBranchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
