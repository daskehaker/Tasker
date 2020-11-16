import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseListComponent } from './exercise-list.component';

describe('ExerciseListComponent', () => {
  let component: ExerciseListComponent;
  let fixture: ComponentFixture<ExerciseListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExerciseListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    // fixture = TestBed.createComponent(ExerciseListComponent);
    // component = fixture.componentInstance;
    // fixture.detectChanges();
    component = new ExerciseListComponent(null, null)
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
