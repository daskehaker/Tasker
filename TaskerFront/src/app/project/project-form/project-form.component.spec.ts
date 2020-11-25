import { ProjectService } from 'src/app/shared/services/project.service';
import { ToastrService } from 'ngx-toastr';
import { ProjectFormComponent } from './project-form.component';
import { autoSpy } from 'auto-spy';
import { observable, of, Observable, throwError } from 'rxjs';

describe('ProjectComponent', () => {
  it('when ngOnInit is called component should be toBeTruthy', () => {
    // arrange
    const { build } = setup().default();
    const p = build();
    // act
    p.ngOnInit();
    // assert
    expect(p).toBeTruthy();
  });
  it('when onSubmit is called it should call insert', () => {
    // arrange
    const { build, service } = setup().default();
    const p = build();
    service.formData = {ProjectId: 0, Date: null, Title: null, Description: null}
    const spy = spyOn(p, 'insert')
    // act
    p.onSubmit(null);
    // assert
    expect(spy).toHaveBeenCalled();
  });
  it('when onSubmit is called it should', () => {
    // arrange
    const { build, service } = setup().default();
    const p = build();

    service.formData = {ProjectId: 1, Date: null, Title: null, Description: null}
    const spy = spyOn(p, 'update')
    // act
    p.onSubmit(null);
    // assert
    expect(spy).toHaveBeenCalled();
  });

  
  it('Update method should return object not error', () => {
    const { build, service, toastr } = setup().default();
    const p = build();
    
    service.put.and.returnValue(of({Empty:'object'}))
    
    p.update(null)
    
    expect(p.error).toBeUndefined();
  })
  
  it('inser method should not return error', () => {
    const { build, service } = setup().default();
    const p = build();

    service.post.and.returnValue(of({Empty:'object'}))
    
    p.insert(null)
    
    expect(p.error).toBeUndefined();
  })
  
  it('inser method shouldshould call error', () => {
    const { build, service } = setup().default();
    const p = build();
    
    service.post.and.returnValue(throwError({}))
    
    
    p.insert(null)
    
    expect(p.error).toBeDefined();
  });
  it('update method shouldshould call error', () => {
    const { build, service } = setup().default();
    const p = build();
    
    service.put.and.returnValue(throwError({}))
    
    p.update(null)
    
    expect(p.error).toBeDefined();
  });
  
  it('shoud return correct formData property from service', () => {
    const { build, service } = setup().default();
    const p = build();

    service.formData = {ProjectId: 1, Date: null, Title: null, Description: null}
    const result = {ProjectId: 1, Date: null, Title: null, Description: null}

    expect(result).toEqual(p.formData);
  });
});

function setup() {
  const service = autoSpy(ProjectService);
const toastr = autoSpy(ToastrService);
  const builder = {
    service,
    toastr,
    default() {
      return builder;
    },
    build() {
      return new ProjectFormComponent(service,toastr);
    }
  };

  return builder;
}
