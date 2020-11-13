import { Component, OnInit } from '@angular/core';
import { NgForm, FormArray } from '@angular/forms';
import { ProjectService } from 'src/app/shared/services/project.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  constructor(public service: ProjectService, private toastr: ToastrService) {}

  ngOnInit() {
    this.service.resetForm();
  }

  onSubmit(form:NgForm){
    if(this.service.formData.ProjectId==0) this.insert(form)
    else this.update(form)
  }

  get formData(){
    return this.service.formData;
  }

  update(form:NgForm){
    console.log("reikia updatint")
    this.service.put().subscribe(
      res => {
        this.service.resetForm(form)
        this.toastr.info('Exercise Updated successfully')
        this.service.get()
      },
      err => {
        console.log(err)
      }
    )
  }

  insert(form:NgForm){
    this.service.post().subscribe(
      res => {
        this.service.resetForm(form)
        this.toastr.success('Project submitted successfully')
        this.service.get()
      },
      err => {
        console.log(err)
      }
    )
  }

}
