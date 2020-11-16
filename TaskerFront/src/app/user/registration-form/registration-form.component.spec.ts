import { UserService } from './../../shared/services/user.service';
import { FormBuilder } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationFormComponent } from './registration-form.component';

describe('RegistrationFormComponent', () => {
  let component: RegistrationFormComponent;
  let fixture: ComponentFixture<RegistrationFormComponent>;
  
  //services
  let formBuilder: FormBuilder;
  let userService: UserService;



  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrationFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    // fixture = TestBed.createComponent(RegistrationFormComponent);
    // component = fixture.componentInstance;
    // fixture.detectChanges();

    //nezinau kas tiksliai vyksta
    userService = new UserService(null, null)
    formBuilder = new FormBuilder();
    component=new RegistrationFormComponent(formBuilder, userService, null, null)
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
