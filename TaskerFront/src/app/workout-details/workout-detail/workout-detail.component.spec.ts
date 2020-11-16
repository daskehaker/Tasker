import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutDetailComponent } from './workout-detail.component';

describe('WorkoutDetailComponent', () => {
  let component: WorkoutDetailComponent;
  let fixture: ComponentFixture<WorkoutDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkoutDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    // fixture = TestBed.createComponent(WorkoutDetailComponent);
    // component = fixture.componentInstance;
    // fixture.detectChanges();
    component = new WorkoutDetailComponent(null, null, null, null, null, null)
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
