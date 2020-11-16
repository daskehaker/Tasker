import { ExerciseDetailService } from 'src/app/shared/services/exercise-detail.service';
import { ExerciseDetail } from 'src/app/shared/models/exercise-detail.model';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExerciseListComponent } from './add-exercise-list.component';
import { WorkoutDetailService } from 'src/app/shared/services/workout-detail.service';
import { ChangeDetectorRef } from '@angular/core';

describe('AddExerciseListComponent', () => {
  let component: AddExerciseListComponent;
  let fixture: ComponentFixture<AddExerciseListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddExerciseListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    TestBed.configureTestingModule({
      //provide component-under-test and dependent service
      providers: [
        AddExerciseListComponent,
        {provide: ExerciseDetailService, useClass: MockExerciseDetailService},
        {provide: WorkoutDetailService, useClass: MockWorkoutDetailService},
        {provide: ChangeDetectorRef, useClass: MockChangeDetectorRef}
      ]
    });
    component = TestBed.inject(AddExerciseListComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

class MockExerciseDetailService {}
class MockWorkoutDetailService {}
class MockChangeDetectorRef {}