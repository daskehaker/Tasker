
import { WorkoutDetailService } from 'src/app/shared/services/workout-detail.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WorkoutDetail } from 'src/app/shared/models/workout-detail.model';
import { WorkoutFormComponent } from '../workout-form/workout-form.component';

@Component({
  selector: 'workout-edit',
  templateUrl: './workout-edit.component.html',
  styleUrls: ['./workout-edit.component.css']
})
export class WorkoutEditComponent implements OnInit {
  @ViewChild(WorkoutFormComponent)
  private detailComponent: WorkoutFormComponent;
  id: number;
  workout: WorkoutDetail;
  error: any;
  

  constructor(private route: ActivatedRoute,
    private service: WorkoutDetailService) {
    route.params.subscribe(p =>
      this.id = +p['id'])
  }

  ngOnInit(): void {
    this.getWorkout();
  }

  getWorkout(){
    this.service.get(this.id).subscribe((res: WorkoutDetail) => {
      this.workout = res;
      this.detailComponent.PopulateForm(this.workout);
    },
    err => {
      this.error = err;
      console.log(err)
    });
  }

  getService(){
    return this.service;
  }
}
