import { UserService } from '../services/user.service';
import { Component} from '@angular/core';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private servise: UserService) { }

  logout(){
    this.servise.logout();
  }

  get localStorage(){
    return localStorage
  }
}
