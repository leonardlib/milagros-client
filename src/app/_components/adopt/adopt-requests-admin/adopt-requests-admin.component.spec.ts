import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdoptRequestsAdminComponent } from './adopt-requests-admin.component';

describe('AdoptRequestsAdminComponent', () => {
  let component: AdoptRequestsAdminComponent;
  let fixture: ComponentFixture<AdoptRequestsAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdoptRequestsAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdoptRequestsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
