import { Observable, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutEditComponent } from './workout-edit.component';
import { WorkoutDetailService } from 'src/app/shared/services/workout-detail.service';

describe('WorkoutEditComponent', () => {
  let component: WorkoutEditComponent;
  let fixture: ComponentFixture<WorkoutEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkoutEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    TestBed.configureTestingModule({
      //provide component-under-test and dependent service
      providers: [
        WorkoutEditComponent,
        {provide: ActivatedRoute, useClass: MockActivatedRoute},
        {provide: WorkoutDetailService, useClass: MockWorkoutDetailService}
      ]
    });
    component = TestBed.inject(WorkoutEditComponent);
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