import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonatePaypalComponent } from './donate-paypal.component';

describe('DonatePaypalComponent', () => {
  let component: DonatePaypalComponent;
  let fixture: ComponentFixture<DonatePaypalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonatePaypalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonatePaypalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
