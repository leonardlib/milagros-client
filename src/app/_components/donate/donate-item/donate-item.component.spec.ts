import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonateItemComponent } from './donate-item.component';

describe('DonateItemComponent', () => {
  let component: DonateItemComponent;
  let fixture: ComponentFixture<DonateItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonateItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonateItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
