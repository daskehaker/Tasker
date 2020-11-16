import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { UserService } from '../shared/services/user.service';

import { UserDetailsComponent } from './user-details.component';

describe('UserDetailsComponent', () => {
  let component: UserDetailsComponent;
  let fixture: ComponentFixture<UserDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    TestBed.configureTestingModule({
      //provide component-under-test and dependent service
      providers: [
        UserDetailsComponent,
        {provide: UserService, useClass: MockUserService}
      ]
    });
    component = TestBed.inject(UserDetailsComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

class MockUserService {
  getAllUsers(){
    return of()
  }
}
