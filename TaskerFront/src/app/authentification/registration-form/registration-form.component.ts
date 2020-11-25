import { UserBody } from './../../shared/models/userBody';
import { Subscription } from 'rxjs';
import { TosterNotificationsService } from './../../shared/services/toster-notifications.service';
import { Router } from '@angular/router';
import { UserService } from '../../shared/services/user.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Component, OnDestroy } from '@angular/core';

@Component({
  selector: 'registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent implements OnDestroy {
  formModel = this.formBuilder.group({
    UserName: ['', Validators.required],
    Email: ['', [Validators.required, Validators.email]],
    FullName: ['', Validators.required],
    Passwords: this.formBuilder.group({
      Password: ['', [Validators.required, Validators.minLength(6)]],
      ConfirmPassword: ['', Validators.required]
    }, {validator: this.ComparePasswords})})

    errors: string[] = []

    subscription: Subscription
    responce: any;

  constructor(private formBuilder: FormBuilder,
    private userServise: UserService,
    private router: Router,
    private toster: TosterNotificationsService) { 
      // this.formModel.reset()
    }

  ngOnDestroy() {
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }

  get UserName(){
    return this.formModel.get('UserName')
  }

  get Email(){
    return this.formModel.get('Email')
  }
  get FullName(){
    return this.formModel.get('FullName')
  }
  get Password(){
    return this.formModel.get('Passwords').get('Password')
  }
  get ConfirmPassword(){
    return this.formModel.get("Passwords").get("ConfirmPassword")
  }

  ComparePasswords(fb: FormGroup){
    let ConfirmPassword = fb.get('ConfirmPassword')
    let Password = fb.get('Password')
    if (ConfirmPassword.errors == null || 'passwordMismatch' in ConfirmPassword.errors){
      if(Password.value != ConfirmPassword.value){
        ConfirmPassword.setErrors({ passwordMismatch: true });
        return false
      }
      else { 
        ConfirmPassword.setErrors(null);
        return true;
      }
    }
  }

  Submit(){
    this.clearErrorList();

    var userBody = this.registerUserMapping();

    this.subscription = this.subscribeRegistration(userBody);
  }

  subscribeRegistration(user: UserBody): Subscription {
   return this.userServise.register(user).subscribe(
      (res) => {
        console.log(res);
        this.responce = res;
        this.toster.create('User');
        this.router.navigate(['user/login'], { queryParams: { registered: 'true' } });
      }, 
      (err) => {
        this.pushErrorMessage(err);
    })
  }

  clearErrorList(){
    this.errors = [];
  }

  registerUserMapping(): UserBody{
    let userBody = {
      UserName: this.UserName.value,
      Email: this.Email.value,
      FullName: this.FullName.value,
      Password: this.Password.value
    }
    return userBody
  }

  pushErrorMessage(err: any){
    err.error.message.forEach(element => 
    {
      this.errors.push(element.Description);
    });
  }
}
