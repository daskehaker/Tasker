import { ToastrService } from 'ngx-toastr';
import { ProjectDetail } from './../../shared/models/project-detail.models';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProjectService } from 'src/app/shared/services/project.service';
import { runInThisContext } from 'vm';


@Component({
  selector: 'project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
  isTouched: boolean;

  constructor(private service: ProjectService, private toastr: ToastrService) {
    this.isTouched=false;
  }

  ngOnInit() {
    this.service.get()
    //this.service.sort()
  }

  get projects() {
    return this.service.list
  }

  populateForm(project: ProjectDetail){
    this.isTouched = !this.isTouched;
    this.service.edit(project, this.isTouched)
  }

  onDelete(id:number){
    if (confirm("Are you sure?"))
    this.service.delete(id).subscribe(
      res => {
        this.toastr.warning('Project Deleted successfully')
        this.service.get()
      },
      err => {
        console.log(err)
      }
    )
  }
}
