import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExerciseListComponent } from './add-exercise-list.component';

describe('AddExerciseListComponent', () => {
  let component: AddExerciseListComponent;
  let fixture: ComponentFixture<AddExerciseListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddExerciseListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddExerciseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
