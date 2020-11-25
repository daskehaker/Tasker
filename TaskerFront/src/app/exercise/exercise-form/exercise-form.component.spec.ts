import { NgForm } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ToastrService } from 'ngx-toastr';
import { ExerciseDetailService } from 'src/app/shared/services/exercise-detail.service';
import { ExerciseFormComponent } from './exercise-form.component';
import { autoSpy } from 'auto-spy';
import { of, throwError } from 'rxjs';

describe('ExerciseDetailComponent', () => {
  let component: ExerciseFormComponent;
  let fixture: ComponentFixture<ExerciseFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExerciseFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {

    const a = setup().default();

    TestBed.configureTestingModule({
      //provide component-under-test and dependent service
      providers: [
        ExerciseFormComponent,
        {provide: ExerciseDetailService, useClass: MockExerciseDetailService},
        {provide: ToastrService, useClass: MockToastrService}
      ]
    });
    component = TestBed.inject(ExerciseFormComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call resetForm', () => {
    const spy = spyOn(component, 'resetForm')
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('should call insert', () => {
    let mockService = new MockExerciseDetailService();
    mockService.setId(0);
    component = new ExerciseFormComponent(mockService as unknown as ExerciseDetailService, null)
    const spy = spyOn(component, 'insert')
    component.onSubmit(null);
    expect(spy).toHaveBeenCalled();
  });

  it('should call update', () => {
    let mockService = new MockExerciseDetailService();
    mockService.setId(1);
    component = new ExerciseFormComponent(mockService as unknown as ExerciseDetailService, null)
    const spy = spyOn(component, 'update')
    component.onSubmit(null);
    expect(spy).toHaveBeenCalled();
  });
  
  it('shoud return instance of service', () =>{
    let result = component.getService
    expect(result).toBeInstanceOf(MockExerciseDetailService);
  })

  it('should clear form', () => {
    const testForm = {
      ExerciseId: 0,
      MusculeGroup: null,
      Name: "",
      VideoUrl: null
  };
  component.resetForm();
  let result = component.getService.formData
  expect(result).toEqual(testForm)
  });
  
  it('inser and update method shouldshould call error', () => {
    const { build, service } = setup().default();
    const p = build();
    
    service.post.and.returnValue(throwError({}))
    service.put.and.returnValue(throwError({}))

    p.insert(null)
    p.update(null)

    // expect(spy).toHaveBeenCalled();
  });

  it('inser and update method should get response', () => {
    const { build, service } = setup().default();
    const p = build();
    
    service.post.and.returnValue(of({}))
    service.put.and.returnValue(of({}))

    p.insert(null)
    p.update(null)

    // expect(spy).toHaveBeenCalled();
  });

});

class MockExerciseDetailService {
  formData: any;

  setId(x: number){
    this.formData = {ExerciseId: x};
  }
}

class MockToastrService {

}
function setup() {
    const service = autoSpy(ExerciseDetailService);
    const toastr = autoSpy(ToastrService);
    const builder = {
        service,
        toastr,
        default() {
            return builder;
        },
        build() {
            return new ExerciseFormComponent(service, toastr);
        }
    }
    return builder;
}