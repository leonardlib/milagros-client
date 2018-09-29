import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonateCardComponent } from './donate-card.component';

describe('DonateCardComponent', () => {
  let component: DonateCardComponent;
  let fixture: ComponentFixture<DonateCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonateCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonateCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
