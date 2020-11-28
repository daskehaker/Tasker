import { UserService } from '../shared/services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private userService: UserService) { }
  allUsers: any[] = [];

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe((res: any[]) => {
      this.allUsers = res
      console.log(res)
    });
  }

}
