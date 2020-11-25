import { throwError } from 'rxjs';
import { WorkoutDetail } from 'src/app/shared/models/workout-detail.model';
import { ExerciseDetail } from './../../shared/models/exercise-detail.model';
import * as _ from 'underscore';
import { WorkoutDetailService } from 'src/app/shared/services/workout-detail.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-workout-view',
  templateUrl: './workout-view.component.html',
  styleUrls: ['./workout-view.component.css']
})
export class WorkoutViewComponent implements OnInit, OnDestroy {
  workout = { Title: "Loading...", Exercises: []}
  exercises: ExerciseDetail[]
  id: number;
  error: any;

  constructor(private servise: WorkoutDetailService,
    route: ActivatedRoute,
    private router: Router) { 
      route.params.subscribe(p => {
        this.id = +p['id']
        if(isNaN(this.id) || this.id <= 0)
        router.navigate(['/workouts']);
        return;
      });
    }
    
  ngOnDestroy(): void {
    // throw new Error('Method not implemented.');
  }

    edit(){
      this.router.navigate(['/workouts/edit/', this.id])
    }
    
    getRouter(){
      return this.router
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
        
            else return 0;
        }
        );
        console.log(this.workout)
      });
  }

  delete(){
    if (confirm("Are you sure?")){
      this.servise.delete(this.id)
        .subscribe(x => {
          this.router.navigate(['/workouts']);
        },
        (err) => {
          console.error(err);
          this.error = err
        })
    }
  }
}
