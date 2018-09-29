import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonateStoreComponent } from './donate-store.component';

describe('DonateStoreComponent', () => {
  let component: DonateStoreComponent;
  let fixture: ComponentFixture<DonateStoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonateStoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonateStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
