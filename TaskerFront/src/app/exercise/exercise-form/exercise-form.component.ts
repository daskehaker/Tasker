import { TosterNotificationsService } from './../../shared/services/toster-notifications.service';
import { MusculeGroup } from '../../enumerations/musculeGroup';
import { ExerciseDetailService } from '../../shared/services/exercise-detail.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

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
      ExerciseId: 0,
      MusculeGroup: null,
      Name: "",
      VideoUrl: null
    }
  }

  onSubmit(form:NgForm){
    if(this.service.formData.ExerciseId==0) this.insert(form)
    else this.update(form)
  }

  update(form:NgForm){
    this.service.put().subscribe(
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
    this.service.post().subscribe(
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