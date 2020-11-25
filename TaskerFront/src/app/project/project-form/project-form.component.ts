import { TosterNotificationsService } from 'src/app/shared/services/toster-notifications.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProjectService } from 'src/app/shared/services/project.service';

@Component({
  selector: 'project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css']
})
export class ProjectFormComponent implements OnInit {
  item: string = "Project"
  
  constructor(public service: ProjectService, private toster: TosterNotificationsService) {}

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
    this.service.put().subscribe(
      res => {
        this.service.resetForm(form)
        this.toster.update(this.item)
        this.service.get()
      },
      err => {
        console.log(err);
      }
    )
  }

  insert(form:NgForm){
    this.service.post().subscribe(
      res => {
        this.service.resetForm(form)
        this.toster.create(this.item);
        this.service.get()
      },
      err => {
        console.log(err)
      }
    )
  }

}
