import { WorkoutExercise } from './../../shared/models/workout-detail.model';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { WorkoutDetail } from 'src/app/shared/models/workout-detail.model';
import { WorkoutDetailService } from 'src/app/shared/services/workout-detail.service';

import { WorkoutViewComponent } from './workout-view.component';

describe('WorkoutViewComponent Good Casses', () => {
  let component: WorkoutViewComponent;
  let fixture: ComponentFixture<WorkoutViewComponent>;

  let workoutServiceStub: Partial<WorkoutDetailService>;
  let routeStub: Partial<ActivatedRoute>;
  let routerStub: Partial<Router>;
  
  let obj1 = new WorkoutExercise()
  obj1.Index= 2
  let obj2 = new WorkoutExercise()
  obj1.Index= 1
  let temp = new WorkoutDetail();
  temp.Exercises = [obj1, obj2];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkoutViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    workoutServiceStub = {
      get: () => of(temp),
      delete: (nr: number) =>{
        if(nr<0) return throwError({error: ''})
        return of({})
      } 
    }
    routeStub= {
      params: of({id: -1})
    }

    routerStub = {
      navigate: jasmine.createSpy('navigate')
    }

    TestBed.configureTestingModule({
      declarations: [WorkoutViewComponent],
      providers: [
        {provide: WorkoutDetailService, useValue: workoutServiceStub},
        {provide: Router, useValue: routerStub},
        {provide: ActivatedRoute, useValue: routeStub}
      ]
    })
    fixture = TestBed.createComponent(WorkoutViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create Component', () => {
    expect(component).toBeTruthy();
  });

  it('should delete and navigate', () => {
    component.id = 1
    spyOn(window, 'confirm').and.returnValue(true)
    component.delete()
    expect(routerStub.navigate).toHaveBeenCalledWith(['/workouts']);
  })

  it('should delete get error', () => {
    spyOn(window, 'confirm').and.returnValue(true)
    let err = {error: ''}
    component.delete()
    expect(component.error).toEqual(err);
  })

  it('should return router', () => {
    let result = component.getRouter();
    expect(result).toBeTruthy();
  })
});