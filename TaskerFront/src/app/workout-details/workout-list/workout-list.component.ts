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
  constructor(private service: WorkoutDetailService) { }

  ngOnInit(): void {
    this.service.GetList().subscribe((res: WorkoutDetail[]) => this.list = res)
    this.service.newWorkout.subscribe((res: WorkoutDetail) => { if (res.Title) this.list.push(res)})
  }
}
