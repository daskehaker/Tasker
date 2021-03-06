import { TosterNotificationsService } from './../../shared/services/toster-notifications.service';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkoutExercise, WorkoutDetail } from './../../shared/models/workout-detail.model';
import { WorkoutDetailService } from '../../shared/services/workout-detail.service';
import { Component, OnInit, ChangeDetectorRef, AfterViewInit, NgZone, Input } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';
import { tap, delay, take } from 'rxjs/operators';

@Component({
  selector: 'workout-form',
  templateUrl: './workout-form.component.html',
  styleUrls: ['./workout-form.component.css']
})
export class WorkoutFormComponent implements OnInit, AfterViewInit {
  form: FormGroup;
  index = 1;

  constructor(
    private ngZode: NgZone,
    private formBuilder: FormBuilder,
    private router: Router, 
    private service: WorkoutDetailService,
    private cdr: ChangeDetectorRef,
    private toster: TosterNotificationsService) {}

  ngAfterViewInit(): void {
    this.service.currentExercise.pipe(
      delay(0)).subscribe((res: WorkoutExercise) => 
      {
        if(res.ExerciseId)
          {
            this.AddExer(res)
          } 
      })
    this.cdr.detectChanges();
  }

  ngOnInit(): void {
    this.resetForm()
   }

  PopulateForm(workout: WorkoutDetail) {
    this.index = workout.Exercises.length;
    this.form = this.formBuilder.group({
      WorkoutId: workout.WorkoutId,
      Title: workout.Title,
      Type: 0,
      Date: new Date(workout.Date),
      Exercises: this.formBuilder.array([])
    })
    workout.Exercises.forEach(element => {
      this.AddExer(element)
    });    
  }
  
  ClearForm() {
    this.index = 1;
    return this.formBuilder.group({
      WorkoutId: 0,
      Title: "",
      Type: 0,
      Date: null,
      Exercises: this.formBuilder.array([])
    });
  }

  CreateExer(exercise: WorkoutExercise): FormGroup{
    return this.formBuilder.group({
      ExerciseId: exercise.ExerciseId,
      Name: exercise.Name,
      Sets: exercise.Sets,
      Reps: exercise.Reps,
      Index: exercise.Index
    })
  }

  AddExer(exercise: WorkoutExercise) {
    exercise.Index = this.index;
    this.index =this.index + 1;
    (this.form.get('Exercises') as FormArray).push(this.CreateExer(exercise))
  }

  RemoveExer(index: number) {
    (this.form.get('Exercises') as FormArray).removeAt(index);
  }

  get Title() {
    return this.form.get('Title')
  }

  get Date() {
    return this.form.get('Date')
  }

  get Exercises() {
    return this.form.get('Exercises') as FormArray;
  }

  getAt(i: number){
    return this.Exercises.at(i) as FormControl
  }

  Submit() {
    delete this.form.value.Name;
    if(+this.form.get("WorkoutId").value == 0){
      this.insert();
    }
    else {
      this.update();
    }
  }

  insert(){
    const subscription = this.service.Add(this.form.value).pipe(take(1));
    this.ngZode.run(() => {
      subscription.subscribe(res => this.service.workout.next(res))
      this.toster.create("Workout");
      this.resetForm()
    })
  }

  update(){
    const subscription = this.service.Update(this.form.get("WorkoutId").value, this.form.value).pipe(take(1))
    this.ngZode.run(() => {
      subscription.subscribe(res => this.service.workout.next(res))
      this.toster.update("Workout")
      this.router.navigate(['/workouts'])
      this.resetForm()
    })
  }

  resetForm(){
    this.form = this.ClearForm();
    this.service.exercise.next({});
  }
}
