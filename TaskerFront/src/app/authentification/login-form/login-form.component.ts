import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from '../../shared/services/user.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit, OnDestroy {
  formModel = {
    UserName: "",
    Password: ""
  }

  error = "";

  tokenSubscription: Subscription

  constructor(private servise: UserService,
              private router: Router) { }

  ngOnInit(): void {
    this.isAuthenticated();
  }

  isAuthenticated(){
    if(this.checkToken()){
      this.navigateToHome()
    }
    else{
      console.log('need to login');
    }
  }

  checkToken(): boolean{
    if(localStorage.getItem('token')){
      return true;
    }
    else {
      return false
    }
  }

  navigateToHome(){
    this.router.navigateByUrl('/home');
  }

  ngOnDestroy(): void {
    if(this.tokenSubscription){
      this.tokenSubscription.unsubscribe();
    } 
  }

  submit(){
    this.tokenSubscription = this.servise.login(this.formModel).subscribe((res: any) => {
      this.setToken(res.token);
      this.navigateToHome();
    },
    (err) => {
      console.log(err);
      this.error = err.error.message;
    })
  }

  setToken(token: any){
    localStorage.setItem('token', token);
  }
}
