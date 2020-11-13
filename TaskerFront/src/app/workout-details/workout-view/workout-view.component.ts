import { WorkoutDetail } from 'src/app/shared/models/workout-detail.model';
import { element } from 'protractor';
import { ExerciseDetailService } from 'src/app/shared/services/exercise-detail.service';
import { ExerciseDetail } from './../../shared/models/exercise-detail.model';
import * as _ from 'underscore';
import { WorkoutDetailService } from 'src/app/shared/services/workout-detail.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-workout-view',
  templateUrl: './workout-view.component.html',
  styleUrls: ['./workout-view.component.css']
})
export class WorkoutViewComponent implements OnInit {
  workout = { Title: "Loading...", Exercises: []}
  exercises: ExerciseDetail[]
  id: number;

  constructor(private servise: WorkoutDetailService,
    private exerciseServise: ExerciseDetailService,
    route: ActivatedRoute,
    private router: Router) { 
      route.params.subscribe(p => {
        this.id = +p['id']
        if(isNaN(this.id) || this.id <= 0)
        router.navigate(['/workouts']);
        return;
      });
    }

    edit(){
      this.router.navigate(['/workouts/edit/', this.id])
    }
    
    ngOnInit(): void {
      this.servise.get(this.id).subscribe((w: WorkoutDetail) =>{
        this.workout = w;
        this.workout.Exercises.sort(
          (obj1, obj2) => {
            if (obj1.Index > obj2.Index) {
                return 1;
            }
        
            if (obj1.Index < obj2.Index) {
                return -1;
            }
        
            return 0;
        }
        );
        console.log(this.workout.Exercises)
      });
  }

  delete(){
    if (confirm("Are you sure?"))
    this.servise.delete(this.id)
      .subscribe(x => {
        this.router.navigate(['/workouts']);
      })
  }
}
