import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostAdminListComponent } from './post-admin-list.component';

describe('PostAdminListComponent', () => {
  let component: PostAdminListComponent;
  let fixture: ComponentFixture<PostAdminListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostAdminListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostAdminListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
