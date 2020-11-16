import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of, Observable } from 'rxjs';
import { WorkoutDetailService } from 'src/app/shared/services/workout-detail.service';

import { WorkoutListComponent } from './workout-list.component';

describe('WorkoutListComponent', () => {
  let component: WorkoutListComponent;
  let fixture: ComponentFixture<WorkoutListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkoutListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    TestBed.configureTestingModule({
      //provide component-under-test and dependent service
      providers: [
        WorkoutListComponent,
        {provide: WorkoutDetailService, useClass: MockWorkoutDetailService}
      ]
    });
    component = TestBed.inject(WorkoutListComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

class MockWorkoutDetailService{
  newWorkout = new Observable();
  GetList(){
    return of()
  }
  }
