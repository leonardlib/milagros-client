import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PetAdminListComponent } from './pet-admin-list.component';

describe('PetAdminListComponent', () => {
  let component: PetAdminListComponent;
  let fixture: ComponentFixture<PetAdminListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PetAdminListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PetAdminListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
