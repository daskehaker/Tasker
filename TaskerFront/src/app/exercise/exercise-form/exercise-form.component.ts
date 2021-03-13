import { TosterNotificationsService } from './../../shared/services/toster-notifications.service';
import { m } from '../../enumerations/musculeGroup';
import { ExerciseDetailService } from '../../shared/services/exercise-detail.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { take } from 'rxjs/operators';

@Component({
  selector: 'exercise-form',
  templateUrl: './exercise-form.component.html',
  styleUrls: ['./exercise-form.component.css']
})
export class ExerciseFormComponent implements OnInit {
  groups = MusculeGroup;
  item: string = "Exercise";

  constructor(private service: ExerciseDetailService, private toster: TosterNotificationsService) {}

  ngOnInit() {
    this.resetForm();
  }

  get getService(){
    return this.service;
  }

  resetForm(form?:NgForm){
    if(form) form.resetForm()
    this.service.formData = {
      exerciseId: 0,
      musculeGroup: null,
      name: "",
      videoUrl: null
    }
  }

  onSubmit(form:NgForm){
    if(this.service.formData.exerciseId==0) this.insert(form)
    else this.update(form)
  }

  update(form:NgForm){
    const updateSubscription = this.service.put().pipe(take(1));
    updateSubscription.subscribe(
      res => {
        this.resetForm(form)
        this.toster.update(this.item);
        this.service.refreshList()
      },
      err => {
        this.logError(err)
      }
    )
  }

  insert(form:NgForm){
    const isertSubscription = this.service.post().pipe(take(1));
    isertSubscription.subscribe(
      res => {
        this.resetForm(form)
        this.toster.create(this.item);
        this.service.refreshList()
      },
      err => {
        this.logError(err)
      }
    )
  }

  logError(err: any){
    console.log(err)
  }
}
