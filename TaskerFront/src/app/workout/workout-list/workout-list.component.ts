import { Component, OnInit } from '@angular/core';
import { WorkoutDetailService } from 'src/app/shared/services/workout-detail.service';
import { WorkoutDetail } from 'src/app/shared/models/workout-detail.model';

@Component({
  selector: 'workout-list',
  templateUrl: './workout-list.component.html',
  styleUrls: ['./workout-list.component.css']
})
export class WorkoutListComponent implements OnInit {
  list: WorkoutDetail[] = [];
  error: any;
  
  constructor(private service: WorkoutDetailService) { }

  ngOnInit(): void {
    this.getCurrentList();
    this.getNewList();
  }
  
  getCurrentList(){
    this.service.GetList().subscribe((res: WorkoutDetail[]) =>{
      this.list = res
    },
    err => {
      console.log(err)
      this.error = err;
    })
  }
  
  getNewList(){
    this.service.newWorkout.subscribe((res: WorkoutDetail) => { 
      if (res.Title){
         this.list.push(res)
      }
    },
    err => {
      console.log(err)
      this.error = err;
    })
  }
}
