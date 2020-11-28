import { UserService } from './../shared/services/user.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminauthGuard implements CanActivate {
  user: any = {}
  constructor(private router: Router,private userService: UserService){
    this.userService.getUser().subscribe(res => {this.user = res})
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      if(this.user.Role === 'Admin')
        return true;
      else {
        this.router.navigate(['/home'])
        return false;
      }
  }
  
}