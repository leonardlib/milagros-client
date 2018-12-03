import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonateTiendaComponent } from './donate-tienda.component';

describe('DonateTiendaComponent', () => {
  let component: DonateTiendaComponent;
  let fixture: ComponentFixture<DonateTiendaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonateTiendaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonateTiendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
