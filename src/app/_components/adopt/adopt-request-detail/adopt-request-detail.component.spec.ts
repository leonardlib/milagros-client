import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdoptRequestDetailComponent } from './adopt-request-detail.component';

describe('AdoptRequestDetailComponent', () => {
  let component: AdoptRequestDetailComponent;
  let fixture: ComponentFixture<AdoptRequestDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdoptRequestDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdoptRequestDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
