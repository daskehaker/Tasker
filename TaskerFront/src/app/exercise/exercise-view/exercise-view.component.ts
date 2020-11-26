import { WorkoutExercise } from './../../shared/models/workout-detail.model';
import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'exercise-view',
  templateUrl: './exercise-view.component.html',
  styleUrls: ['./exercise-view.component.css']
})
export class ExerciseViewComponent implements OnInit {
  @Input() exercise: WorkoutExercise;
  @Input() index: number;

  safeUrl: any
  isShowDiv = true;

  constructor(public sanitizer: DomSanitizer) {
    
  }

  ngOnInit(): void {
    if(this.isUrl()){
      if(this.containsBadString()){
        this.resplaceUrl()
      }
      this.makeSafeUrl();
    }
  }

  sanitazeUrl(){

  }

  resplaceUrl(){
    this.exercise.VideoUrl = this.exercise.VideoUrl.replace('youtube.com/watch?v=', 'youtube.com/embed/');
  }

  makeSafeUrl(): SafeResourceUrl{
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.exercise.VideoUrl);
    return this.safeUrl
  }

  isUrl(): boolean{
    if(this.exercise.VideoUrl){
      return true;
    }
    else {
      return false;
    }
  }

  containsBadString(): boolean{
    if(this.exercise.VideoUrl.indexOf('youtube.com/watch?v=') > -1) {
      console.log(`ar yra blogas url: ${this.exercise.VideoUrl.indexOf('youtube.com/watch?v=')}`)
      return true;
    }
    else{
      return false
    } 
  }

  toggleDisplayDiv() {
    this.isShowDiv = !this.isShowDiv;
    return this.isShowDiv;
  }

  getValue(){
    return this.isShowDiv;
  }

  get Exercise() {
    return this.exercise;
  }

  get Index() {
    return this.index
  }
}
