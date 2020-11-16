import { WorkoutDetailComponent } from './../workout-detail/workout-detail.component';
import { WorkoutDetailService } from 'src/app/shared/services/workout-detail.service';
import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WorkoutDetail } from 'src/app/shared/models/workout-detail.model';

@Component({
  selector: 'app-workout-edit',
  templateUrl: './workout-edit.component.html',
  styleUrls: ['./workout-edit.component.css']
})
export class WorkoutEditComponent implements OnInit {
  @ViewChild(WorkoutDetailComponent)
  private detailComponent: WorkoutDetailComponent;
  id: number;
  workout: WorkoutDetail;

  constructor(private route: ActivatedRoute,
    private service: WorkoutDetailService,) {
    route.params.subscribe(p =>
      this.id = +p['id'])
  }

  ngOnInit(): void {
      this.service.get(this.id).subscribe((res: WorkoutDetail) => {
        this.workout = res;
        this.detailComponent.PopulateForm(this.workout);
      });
  }



}
