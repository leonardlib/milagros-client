import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonateItemAdminComponent } from './donate-item-admin.component';

describe('DonateItemAdminComponent', () => {
  let component: DonateItemAdminComponent;
  let fixture: ComponentFixture<DonateItemAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonateItemAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonateItemAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
