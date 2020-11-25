import { ExerciseDetailService } from 'src/app/shared/services/exercise-detail.service';
import { WorkoutDetailService } from 'src/app/shared/services/workout-detail.service';
import { ChangeDetectorRef } from '@angular/core';
import { AddExerciseListComponent } from './add-exercise-list.component';
import { autoSpy } from 'auto-spy';

describe('AddExerciseListComponent', () => {
  it('when ngOnInit is called it should', () => {
    // arrange
    const { build, cdr } = setup().default();
    const a = build();
    // act
    a.ngOnInit();
    // assert
    expect(cdr.detectChanges).toHaveBeenCalled();
  });
  it('when AddExer is called it should', () => {
    // arrange
    const { build, workoutServise } = setup().default();
    const a = build();
    // act
    a.AddExer(0, '');
    
    expect(workoutServise.AddExercise).toHaveBeenCalledWith(0, '')
  });

  it('when resetFilter is called it should', () => {
    // arrange
    const { build } = setup().default();
    const a = build();
    // act
    a.resetFilter();
    // assert
    expect(a.filter).toEqual({})
  });
  
  it('should return same ExerciseDetail list', () => {
    const { build, exerciseService } = setup().default();
    const a = build();
    var testList = [{ExerciseId:0, MusculeGroup: 0, Name: '', VideoUrl:''},
    {ExerciseId:0, MusculeGroup: 0, Name: '', VideoUrl:''},
    {ExerciseId:0, MusculeGroup: 0, Name: '', VideoUrl:''}]
    exerciseService.list = testList

    let result = a.Exercises;

    expect(result).toEqual(testList);
  })

  it('should return filtered ExerciseDetail list', () => {
    const { build, exerciseService } = setup().default();
    const a = build();
    var testList = [{ExerciseId:0, MusculeGroup: 0, Name: '', VideoUrl:''},
    {ExerciseId:0, MusculeGroup: 0, Name: '', VideoUrl:''},
    {ExerciseId:0, MusculeGroup: 0, Name: '', VideoUrl:''},
    {ExerciseId:0, MusculeGroup: 0, Name: '', VideoUrl:''},
    {ExerciseId:0, MusculeGroup: 0, Name: '', VideoUrl:''}]
    exerciseService.list = testList

    a.filter.Index = 2;
    let result = a.Exercises;

    expect(result.length).toEqual(0);
  })
});

function setup() {
  const exerciseService = autoSpy(ExerciseDetailService);
const workoutServise = autoSpy(WorkoutDetailService);
const cdr = autoSpy(MockChangeDetectorRef);
  const builder = {
    exerciseService,
workoutServise,
cdr,
    default() {
      return builder;
    },
    build() {
      return new AddExerciseListComponent(exerciseService,workoutServise,cdr);
    }
  };

  return builder;
}

class MockChangeDetectorRef implements ChangeDetectorRef{
  markForCheck(): void {
    throw new Error('Method not implemented.');
  }
  detach(): void {
    throw new Error('Method not implemented.');
  }
  detectChanges(): void {
    throw new Error('Method not implemented.');
  }
  checkNoChanges(): void {
    throw new Error('Method not implemented.');
  }
  reattach(): void {
    throw new Error('Method not implemented.');
  }
}