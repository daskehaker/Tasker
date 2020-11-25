import { WorkoutDetail } from 'src/app/shared/models/workout-detail.model';
import { Observable, of, BehaviorSubject, throwError } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutEditComponent } from './workout-edit.component';
import { WorkoutDetailService } from 'src/app/shared/services/workout-detail.service';

describe('WorkoutEditComponent', () => {
  let component: WorkoutEditComponent;
  let fixture: ComponentFixture<WorkoutEditComponent>;

  let workoutServiceStub: Partial<WorkoutDetailService>;
  let routeStub: Partial<ActivatedRoute>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkoutEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    routeStub = {
      params: of({id: -1})
    }

    workoutServiceStub = {
      get: (nr: number) => {
       if(nr< 0) return (throwError({messge: 'error message'}))
       else return of({})
      }
    //   delete: (nr: number) =>{
    //     if(nr<0) return throwError({error: ''})
    //     return of({})
    //   } 
    }
    TestBed.configureTestingModule({
      declarations: [ WorkoutEditComponent ],
      providers: [
        WorkoutEditComponent,
        {provide: ActivatedRoute, useValue: routeStub },
        {provide: WorkoutDetailService, useValue: workoutServiceStub}
      ]
    });
    fixture = TestBed.createComponent(WorkoutEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('getWorkout should get error', () => {
    workoutServiceStub.get(-1)
    component.getWorkout();
    expect(component.error).toEqual({messge: 'error message'})
  })

  it('getWorkout should get response', () => {
    spyOn(workoutServiceStub, 'get').and.returnValue(of({obj: '0'}))
    component.getWorkout();
    expect(component.workout).toBeDefined()
  })
});

class MockActivatedRoute{
  urlparams = new BehaviorSubject({})
  constructor(){
    this.urlparams.next({id: 1})
  }
  params = this.urlparams.asObservable();
}

class MockWorkoutDetailService{
  get(nr: number){
    if(nr == 1) return of({});
    else return throwError({messge: 'error message'});
  }
}