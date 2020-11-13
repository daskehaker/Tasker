import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly rootUrl = environment.rootUrl + "/api/applicationusers/" //"https://tasker2.azurewebsites.net/api/applicationusers/"
  constructor(private http: HttpClient, private router: Router) { }

  register(newUser){
    return this.http.post(this.rootUrl + 'register', newUser)
  }

  login(user){
    return this.http.post(this.rootUrl + "login", user)
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigateByUrl('/user/login');
  }

  getUser(){
    return this.http.get(environment.rootUrl + "/api/userprofiles");
  }

  getAllUsers(){
    return this.http.get(environment.rootUrl + "/api/userprofiles/all");
  }
}
