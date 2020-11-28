import { UserService } from './../../shared/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  id: string;
  user: any = {}

  constructor(route: ActivatedRoute, router: Router, private userService: UserService) { 
    route.params.subscribe(p => {
      this.id = p['id']
      if(!this.id)
      router.navigate(['/workouts']);
      return;
    });
  }

  ngOnInit(): void {
    this.userService.getUserById(this.id).subscribe((res: any) => {
      this.user = res;
      console.log(this.user);
    })
  }

}
