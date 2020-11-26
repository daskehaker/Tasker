import { TosterNotificationsService } from 'src/app/shared/services/toster-notifications.service';
import { ProjectDetail } from './../../shared/models/project-detail.models';
import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/shared/services/project.service';
import { take } from 'rxjs/operators';


@Component({
  selector: 'project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
  isTouched: boolean;
  item: string = 'Project';

  constructor(private service: ProjectService, private toster: TosterNotificationsService) {
    this.isTouched=false;
  }

  ngOnInit() {
    this.service.get()
    this.service.sort()
  }

  get projects() {
    return this.service.list
  }

  populateForm(project: ProjectDetail){
    this.isTouched = !this.isTouched;
    this.service.edit(project, this.isTouched)
  }

  onDelete(id:number){
    const subscription = this.service.delete(id).pipe(take(1));
    if (confirm("Are you sure?")){
      subscription.subscribe(
        () => {
          this.toster.delete(this.item);
          this.service.get()
        },
        err => {
          console.log(err)
        }
      )
    }
  }
}
