import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileAdoptRequestListComponent } from './profile-adopt-request-list.component';

describe('ProfileAdoptRequestListComponent', () => {
  let component: ProfileAdoptRequestListComponent;
  let fixture: ComponentFixture<ProfileAdoptRequestListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileAdoptRequestListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileAdoptRequestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
