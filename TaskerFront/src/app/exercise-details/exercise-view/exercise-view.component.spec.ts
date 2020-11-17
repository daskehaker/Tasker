import { WorkoutExercise } from './../../shared/models/workout-detail.model';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
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
        TestBed.configureTestingModule({
      //provide component-under-test and dependent service
      providers: [
        ExerciseViewComponent,
        {provide: DomSanitizer, useClass: Fake}
      ]
    });
    component = TestBed.inject(ExerciseViewComponent);
    component.index = 1;

    component.exercise = {
      ExerciseId: 0,
      Name: "",
      Sets:0,
      Reps:0,
      VideoUrl:"",
      Index:0,
    };
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
  });
  
  it('should be bool', () => {
    expect(component.getValue()).toBe(true);
  });

  it('index should be equal to 1', () => {
    expect(component.Index).toEqual(1);
  });

  it('function isUrl should return true', () => {
    component.exercise.VideoUrl = "not null"
    let result = component.isUrl();
    expect(result).toBeTrue;
  });
  
  it('function isUrl should return false', () => {
    component.exercise.VideoUrl = ""
    let result = component.isUrl();
    expect(result).toBeFalse;
  });
  
  it('function containsBadString should return true', () => {
    component.exercise.VideoUrl = "youtube.com/watch?v="
    let result = component.containsBadString();
    expect(result).toBeTrue;
  });
  
  it('function containsBadString should return false', () => {
    // component.exercise.VideoUrl = ""
    let result = component.containsBadString();
    expect(result).toBe(false);
  });

  it('shoud call makeSafeUrl', () => {
    const spy = spyOn(component, 'makeSafeUrl');
    component.exercise.VideoUrl = "youtube.com/watch?v=";
    component.ngOnInit();
    expect(spy).toHaveBeenCalled()
  })

  it('shoud call replaceUrl', () => {
    const spy = spyOn(component, 'resplaceUrl');
    component.exercise.VideoUrl = "youtube.com/watch?v=";
    component.ngOnInit();
    expect(spy).toHaveBeenCalled()
  })

  it('should return Exercise', () => {
    let expectedResult: WorkoutExercise = {
      ExerciseId: 0,
      Name: "",
      Sets:0,
      Reps:0,
      VideoUrl:"",
      Index:0,
    };

    let result = component.Exercise;

    expect(result).toEqual(expectedResult)
  })

});

class Fake{

  bypassSecurityTrustResourceUrl(url: string): SafeResourceUrl{
    return url as SafeResourceUrl
  }
}