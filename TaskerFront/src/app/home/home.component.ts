import { UserService } from '../shared/services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user: any = {}

  constructor(private servise: UserService) {
    this.servise.getUser().subscribe(res => {
      this.user = res
      if(this.user.Role === 'Admin'){
        localStorage.setItem('admin', 'Admin')
      }
    })
  }
  
  ngOnInit(): void {

  }
}