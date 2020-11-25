import { NgZone } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { WorkoutDetailService } from '../../shared/services/workout-detail.service';
import { ChangeDetectorRef } from '@angular/core';
import { WorkoutFormComponent } from './workout-form.component';
import { autoSpy } from 'auto-spy';
import { BehaviorSubject, of } from 'rxjs';
import { WorkoutDetail, WorkoutExercise } from 'src/app/shared/models/workout-detail.model';
import { worker } from 'cluster';

describe('WorkoutDetailComponent', () => {
  it('when ngAfterViewInit is called it should detect changes', () => {
    // arrange
    const { build, service, cdr } = setup().default();
    const w = build();
    service.exercise = new BehaviorSubject({})
    service.exercise.next(new WorkoutExercise());
    service.currentExercise = service.exercise.asObservable();
    service.currentExercise
    spyOn(service.currentExercise, 'pipe').and.returnValue(of({}))
    // act
    w.ngAfterViewInit();
    // assert
    expect(cdr.detectChanges).toHaveBeenCalled();
  });
  it('when ngOnInit is called it should', () => {
    // arrange
    const { build, service, cdr } = setup().default();
    const w = build();
    service.exercise = new BehaviorSubject({})
    service.exercise.next(new WorkoutExercise());
    service.currentExercise = service.exercise.asObservable();
    service.currentExercise
    spyOn(service.currentExercise, 'pipe').and.returnValue(of({}))
    // act
    w.ngOnInit();
    // assert
    expect(w.resetForm).toHaveBeenCalled();
  });
  it('when PopulateForm is called it should', () => {
    // arrange
    const { build, service, cdr } = setup().default();
    const w = build();
    let workout = new WorkoutDetail()
    workout.Date = new Date()
    workout.Exercises = [new WorkoutExercise(), new WorkoutExercise()]
    // act
    w.PopulateForm(workout);
    // assert
    // expect(w).toEqual
  });
  it('when ClearForm is called it should', () => {
    // arrange
    const { build } = setup().default();
    const w = build();
    // act
    w.ClearForm();
    // assert
    expect(w.index).toEqual(1);
  });
  it('when CreateExer is called it should', () => {
    // arrange
    const { build } = setup().default();
    const w = build();
    // act
    w.CreateExer(null);
    // assert
    // expect(w).toEqual
  });
  it('when AddExer is called it should', () => {
    // arrange
    const { build } = setup().default();
    const w = build();
    // act
    w.AddExer(null);
    // assert
    // expect(w).toEqual
  });
  it('when RemoveExer is called it should', () => {
    // arrange
    const { build } = setup().default();
    const w = build();
    // act
    w.RemoveExer(null);
    // assert
    // expect(w).toEqual
  });
  it('when getAt is called it should', () => {
    // arrange
    const { build } = setup().default();
    const w = build();
    // act
    w.getAt(null);
    // assert
    // expect(w).toEqual
  });
  it('when Submit is called it should', () => {
    // arrange
    const { build } = setup().default();
    const w = build();
    // act
    w.Submit();
    // assert
    // expect(w).toEqual
  });
  it('when resetForm is called it should', () => {
    // arrange
    const { build } = setup().default();
    const w = build();
    // act
    w.resetForm();
    // assert
    // expect(w).toEqual
  });
  
});

function setup() {
  const ngZode = autoSpy(NgZone);
const formBuilder = autoSpy(FormBuilder);
const route = autoSpy(ActivatedRoute);
const router = autoSpy(Router);
const service = autoSpy(WorkoutDetailService);
const cdr = autoSpy(MockChangeDetectorRef);
  const builder = {
    ngZode,
formBuilder,
route,
router,
service,
cdr,
    default() {
      return builder;
    },
    build() {
      return new WorkoutFormComponent(ngZode,formBuilder,route,router,service,cdr);
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