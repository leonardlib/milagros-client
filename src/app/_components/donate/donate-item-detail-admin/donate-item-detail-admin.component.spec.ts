import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonateItemDetailAdminComponent } from './donate-item-detail-admin.component';

describe('DonateItemDetailAdminComponent', () => {
  let component: DonateItemDetailAdminComponent;
  let fixture: ComponentFixture<DonateItemDetailAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonateItemDetailAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonateItemDetailAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
