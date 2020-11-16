import { UserService } from './../shared/services/user.service';
import { Observable, of } from 'rxjs';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let userService: UserService;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    TestBed.configureTestingModule({
      //provide component-under-test and dependent service
      providers: [
        HomeComponent,
        {provide: UserService, useClass: MockUserService}
      ]
    });
    component = TestBed.inject(HomeComponent);
    //userService = TestBed.inject(UserService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

class MockUserService {
  user = {userName: "Username", role: "Admin"};
  getUser(){
    return of(this.user);
  }
}