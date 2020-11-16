import { environment } from '../../../environments/environment';
import { ExerciseDetail } from '../models/exercise-detail.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WorkoutDetail, WorkoutExercise } from '../models/workout-detail.model';
import { BehaviorSubject } from 'rxjs';
import { threadId } from 'worker_threads';

@Injectable({
  providedIn: 'root'
})
export class WorkoutDetailService {
  readonly rootUrl = environment.rootUrl + "/api/Workouts/"
  exercise = new BehaviorSubject({})
  currentExercise = this.exercise.asObservable();

  workout = new BehaviorSubject({})
  newWorkout = this.workout.asObservable();

  constructor(private http: HttpClient) { }

  GetList(){
    return this.http.get(this.rootUrl);
  }

  Add(workout: WorkoutDetail){
    return this.http.post(this.rootUrl, workout)
  }

  Update(id, workout: WorkoutDetail){
    return this.http.put(this.rootUrl + id, workout)
  }

  get(id){
    return this.http.get(this.rootUrl + id);
  }

  delete(id: number) {
    return this.http.delete(this.rootUrl + id);
  }

  AddExercise(id, name){
    let exercise: WorkoutExercise = { ExerciseId: id, Name: name, Reps: 0, Sets: 0, Index: 0 }
    this.exercise.next(exercise)
  }
}


