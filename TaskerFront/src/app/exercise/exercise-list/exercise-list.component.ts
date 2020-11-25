import { TosterNotificationsService } from 'src/app/shared/services/toster-notifications.service';
import { MusculeGroup } from './../../enumerations/musculeGroup';
import { ExerciseDetail } from './../../shared/models/exercise-detail.model';
import { ExerciseDetailService } from '../../shared/services/exercise-detail.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'exercise-list',
  templateUrl: './exercise-list.component.html',
  styleUrls: ['./exercise-list.component.css']
})
export class ExerciseListComponent implements OnInit {
  groups=MusculeGroup;
  item: string = "Exercise";
  isTouched: boolean = false;

  constructor(private service: ExerciseDetailService, private toster: TosterNotificationsService) { }

  ngOnInit(): void {
    this.service.refreshList();
  }

  get Exercises(): ExerciseDetail[] {
    return this.service.list
  }

  populateForm(exercise: ExerciseDetail){
    this.isTouched = !this.isTouched
    this.service.edit(exercise, this.isTouched)
  }

  onDelete(id:number){
    if(confirm('Are you sure?')) {
      this.service.delete(id).subscribe(
        res => {
          this.toster.delete(this.item)
          this.service.refreshList()
        },
        err => {
          this.logError(err)
        }
      )
    }
  }

  logError(err: any){
    console.log(err)
  }
}
