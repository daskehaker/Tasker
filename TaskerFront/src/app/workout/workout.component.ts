import { Component, OnInit } from '@angular/core';
import { MusculeGroup } from '../enumerations/musculeGroup';

@Component({
  selector: 'workout',
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.css']
})
export class WorkoutComponent implements OnInit {
  groups = MusculeGroup;

  constructor() { }

  ngOnInit(): void {
  }

}
