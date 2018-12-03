import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostAdminFormComponent } from './post-admin-form.component';

describe('PostAdminFormComponent', () => {
  let component: PostAdminFormComponent;
  let fixture: ComponentFixture<PostAdminFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostAdminFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostAdminFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
