import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PetSponsorComponent } from './pet-sponsor.component';

describe('PetSponsorComponent', () => {
  let component: PetSponsorComponent;
  let fixture: ComponentFixture<PetSponsorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PetSponsorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PetSponsorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
