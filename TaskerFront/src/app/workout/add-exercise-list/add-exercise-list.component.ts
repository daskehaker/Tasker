import { ExerciseDetail } from './../../shared/models/exercise-detail.model';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MusculeGroup } from 'src/app/enumerations/musculeGroup';
import { ExerciseDetailService } from 'src/app/shared/services/exercise-detail.service';
import { WorkoutDetailService } from 'src/app/shared/services/workout-detail.service';

@Component({
  selector: 'add-exercise-list',
  templateUrl: './add-exercise-list.component.html',
  styleUrls: ['./add-exercise-list.component.css']
})
export class AddExerciseListComponent implements OnInit {

  groups=MusculeGroup;
  filter: any = {};

  constructor(private exerciseService: ExerciseDetailService,
              private workoutServise: WorkoutDetailService, 
              private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.exerciseService.refreshList();
    this.cdr.detectChanges()
  }

  get Exercises(): ExerciseDetail[] {
    
    let list:ExerciseDetail[] = []
    if(this.filter.Index>-1){
      this.exerciseService.list.forEach(e => {
        if(e.MusculeGroup == this.filter.Index){
          list.push(e);
        }
      })
    }
    
    return list
  }

  AddExer(id, name/*: workoutExercise*/){
    this.workoutServise.AddExercise(id, name)
  }

  onFilterChange(){
    console.log(this.filter.Index)
    this.cdr.detectChanges()
  }

  resetFilter(){
    this.filter={};
    this.onFilterChange()
    console.log()
  }

}
