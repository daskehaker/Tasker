import { MusculeGroup } from './../../enumerations/musculeGroup';
import { ExerciseDetailService } from '../../shared/services/exercise-detail.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'exercise-detail',
  templateUrl: './exercise-detail.component.html',
  styleUrls: ['./exercise-detail.component.css']
})
export class ExerciseDetailComponent implements OnInit {
  groups = MusculeGroup;

  constructor(private service: ExerciseDetailService,
    private toastr: ToastrService) {
    }

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
        this.toastr.info('Exercise Updated successfully')
        this.service.refreshList()
      },
      err => {
        console.log(err)
      }
    )
  }

  insert(form:NgForm){
    this.service.post().subscribe(
      res => {
        this.resetForm(form)
        this.toastr.success('Exercise submitted successfully')
        this.service.refreshList()
      },
      err => {
        console.log(err)
      }
    )
  }

}
