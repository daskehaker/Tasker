import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { WorkoutDetailService } from 'src/app/shared/services/workout-detail.service';

import { WorkoutViewComponent } from './workout-view.component';

describe('WorkoutViewComponent', () => {
  let component: WorkoutViewComponent;
  let fixture: ComponentFixture<WorkoutViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkoutViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    TestBed.configureTestingModule({
      //provide component-under-test and dependent service
      providers: [
        WorkoutViewComponent,
        {provide: ActivatedRoute, useClass: MockActivatedRoute},
        {provide: Router, useClass: MockRouter},
        {provide: WorkoutDetailService, useClass: MockWorkoutDetailService}
      ]
    });
    component = TestBed.inject(WorkoutViewComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

class MockActivatedRoute{
  params =  new Observable()
}
  
class MockWorkoutDetailService{
  get(){
    return of()
  }
}

class MockRouter{

}