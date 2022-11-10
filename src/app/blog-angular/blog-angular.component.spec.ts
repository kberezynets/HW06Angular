import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogAngularComponent } from './blog-angular.component';

describe('BlogAngularComponent', () => {
  let component: BlogAngularComponent;
  let fixture: ComponentFixture<BlogAngularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlogAngularComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogAngularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
