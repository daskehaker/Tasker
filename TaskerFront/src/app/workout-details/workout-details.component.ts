import { Component, OnInit } from '@angular/core';
import { MusculeGroup } from '../enumerations/musculeGroup';

@Component({
  selector: 'workout-details',
  templateUrl: './workout-details.component.html',
  styleUrls: ['./workout-details.component.css']
})
export class WorkoutDetailsComponent implements OnInit {
  groups = MusculeGroup;

  constructor() { }

  ngOnInit(): void {
  }

}
