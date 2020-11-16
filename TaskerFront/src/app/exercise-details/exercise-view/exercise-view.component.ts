import { ExerciseDetailService } from 'src/app/shared/services/exercise-detail.service';
import { WorkoutExercise } from './../../shared/models/workout-detail.model';
import { Component, OnInit, Input } from '@angular/core';
import { ExerciseDetail } from 'src/app/shared/models/exercise-detail.model';
import { DomSanitizer } from '@angular/platform-browser';

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

  constructor(private sanitizer: DomSanitizer) {
    
  }

  ngOnInit(): void {
    if(this.exercise.VideoUrl){
      if(this.exercise.VideoUrl.indexOf('youtube.com/watch?v=')>0)
      this.exercise.VideoUrl = this.exercise.VideoUrl.replace('youtube.com/watch?v=', 'youtube.com/embed/');
      this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.exercise.VideoUrl);
    }
  }

  toggleDisplayDiv() {
    this.isShowDiv = !this.isShowDiv;
    return this.isShowDiv;
  }
}
