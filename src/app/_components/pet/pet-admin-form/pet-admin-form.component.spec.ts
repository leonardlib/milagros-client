import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PetAdminFormComponent } from './pet-admin-form.component';

describe('PetAdminFormComponent', () => {
  let component: PetAdminFormComponent;
  let fixture: ComponentFixture<PetAdminFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PetAdminFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PetAdminFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
