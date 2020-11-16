import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseViewComponent } from './exercise-view.component';

describe('ExerciseViewComponent', () => {
  let component: ExerciseViewComponent;
  let fixture: ComponentFixture<ExerciseViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExerciseViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    // fixture = TestBed.createComponent(ExerciseViewComponent);
    // component = fixture.componentInstance;
    // fixture.detectChanges();

    component = new ExerciseViewComponent(null)
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change bool value', () => {
    let initValue = component.isShowDiv;
    component.toggleDisplayDiv();
    expect(component.isShowDiv).toEqual(!initValue);
  });

  it('should be true when component created', () => {
    expect(component.isShowDiv).toBeTrue();
  })
});
