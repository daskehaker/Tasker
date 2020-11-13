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
    if(localStorage.getItem('token')) this.router.navigateByUrl('/home');
  }

  ngOnDestroy(): void {
    if(this.tokenSubscription){
      this.tokenSubscription.unsubscribe();
    } 
  }

  submit(){
    this.tokenSubscription = this.servise.login(this.formModel).subscribe((res: any) => {
      localStorage.setItem('token', res.token);
      this.router.navigateByUrl('/home')
    },
    (err) => {
      console.log(err);
      this.error = err.error.message
    })
  }
}
