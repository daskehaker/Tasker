import { UserService } from '../services/user.service';
import { Component, OnInit, AfterViewInit, ChangeDetectorRef, NgZone } from '@angular/core';
import { delay } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  user$: Observable<any>;
  userRole$ = new BehaviorSubject<string>(null);

  constructor(public service: UserService, private zone: NgZone, private cdr: ChangeDetectorRef) {}

  logout(){
    this.service.logout();
  }

  get localStorage(){
    return localStorage
  }

  get Service(){
    return this.service
  }
}
