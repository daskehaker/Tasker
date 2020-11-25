import { WorkoutDetail } from 'src/app/shared/models/workout-detail.model';
import { async } from '@angular/core/testing';
import { WorkoutDetailService } from 'src/app/shared/services/workout-detail.service';
import { WorkoutListComponent } from './workout-list.component';
import { autoSpy } from 'auto-spy';
import { of, BehaviorSubject, throwError } from 'rxjs';

describe('WorkoutListComponent', () => {
  it('when ngOnInit is called it should call two functions', () => {
    // arrange
    const { build, service } = setup().default();
    const w = build();
    service.GetList.and.returnValue(of())
    service.newWorkout = new BehaviorSubject({})
    const spy1 = spyOn(w, 'getCurrentList')
    const spy2 = spyOn(w, 'getNewList')
    // act
    w.ngOnInit()
    // assert
    expect(spy1).toHaveBeenCalled()
    expect(spy2).toHaveBeenCalled()
  });
  it('when getCurrentList is called it should subscribe list', () => {
    // arrange
    const { build, service } = setup().default();
    const w = build();   
    let testList = [new WorkoutDetail(), new WorkoutDetail(), new WorkoutDetail()]
    service.GetList.and.returnValue(of(testList))
    // act
    w.getCurrentList();

    // assert
    expect(w.list).toEqual(testList)
  });
  it('when getCurrentList is called it should subscribe error', () => {
    // arrange
    const { build, service } = setup().default();
    const w = build();   
    let err = {message: 'error message'}
    service.GetList.and.returnValue(throwError(err))
    // act
    w.getCurrentList();

    // assert
    expect(w.error).toEqual(err)
  });
  it('when getNewList is called it should push new object to list', () => {
    // arrange
    const { build, service } = setup().default();
    const w = build();
    var workout = {
      WorkoutId: 0,
    Title: 'Title',
    Type: 0,
    Date: Date,
    Exercises: null
    };
    service.newWorkout = of(workout)
    // act
    w.getNewList();
    // assert
    expect(w.list).toContain(workout as unknown as WorkoutDetail)
  });

  it('when getNewList is called it should return error', () => {
    // arrange
    const { build, service } = setup().default();
    const w = build();
    let err = {message: 'error message'}
    service.newWorkout = throwError(err)
    // act
    w.getNewList();
    // assert
    expect(w.error).toEqual(err)
  });
  
});

function setup() {
  const service = autoSpy(WorkoutDetailService);
  const builder = {
    service,
    default() {
      return builder;
    },
    build() {
      return new WorkoutListComponent(service);
    }
  };

  return builder;
}
