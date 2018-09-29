import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonateHomeComponent } from './donate-home.component';

describe('DonateHomeComponent', () => {
  let component: DonateHomeComponent;
  let fixture: ComponentFixture<DonateHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonateHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonateHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
