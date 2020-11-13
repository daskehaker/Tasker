import { MusculeGroup } from './../../enumerations/musculeGroup';
import { ExerciseDetail } from './../../shared/models/exercise-detail.model';
import { ExerciseDetailService } from '../../shared/services/exercise-detail.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'exercise-list',
  templateUrl: './exercise-list.component.html',
  styleUrls: ['./exercise-list.component.css']
})
export class ExerciseListComponent implements OnInit {
  groups=MusculeGroup;
  constructor(private service: ExerciseDetailService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.service.refreshList();
  }

  get Exercises(): ExerciseDetail[] {
    return this.service.list
  }

  populateForm(exercise: ExerciseDetail){
    this.service.formData = Object.assign({}, exercise)
  }

  onDelete(id:number){
    this.service.delete(id).subscribe(
      res => {
        this.toastr.warning('Exercise Deleted successfully')
        this.service.refreshList()
      },
      err => {
        console.log(err)
      }
    )
  }
}
