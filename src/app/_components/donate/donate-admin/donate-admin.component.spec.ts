import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonateAdminComponent } from './donate-admin.component';

describe('DonateAdminComponent', () => {
  let component: DonateAdminComponent;
  let fixture: ComponentFixture<DonateAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonateAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonateAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
