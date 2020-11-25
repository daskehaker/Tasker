import { ProjectService } from 'src/app/shared/services/project.service';
import { ToastrService } from 'ngx-toastr';
import { ProjectListComponent } from './project-list.component';
import { autoSpy } from 'auto-spy';
import { of, throwError } from 'rxjs';

describe('ProjectListComponent', () => {
  it('when ngOnInit is called it should', () => {
    // arrange
    const { build } = setup().default();
    const p = build();
    // act
    p.ngOnInit();
    // assert
    // expect(p).toEqual
  });
  it('when populateForm is called it should', () => {
    // arrange
    const { build } = setup().default();
    const p = build();
    // act
    p.populateForm(null);
    // assert
    // expect(p).toEqual
  });
  // it('when onDelete is called it should', () => {
  //   // arrange
  //   const { build } = setup().default();
  //   const p = build();
  //   // act
  //   p.onDelete(1);
  //   // assert
  //   // expect(p).toEqual
  // });

  it('OnDelete should subscibe responce', () => {
    const { build, service } = setup().default();
    const e = build();
    spyOn(window, 'confirm').and.returnValue(true);
    service.delete.and.returnValue(of({}))

    e.onDelete(1)

    // expect(spy).toHaveBeenCalled();
  });

  it('OnDelete should subscibe responce', () => {
    const { build, service } = setup().default();
    const e = build();
    spyOn(window, 'confirm').and.returnValue(true);
    // window.confirm().and.returnValue(true);
    service.delete.and.returnValue(throwError({}))

    e.onDelete(1)

    // expect(spy).toHaveBeenCalled();
  });

  it('Shoud return empty list', () => {
    const { build, service } = setup().default();
    const e = build();

    service.list = [];

    expect(e.projects).toBe(service.list);
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
      return new ProjectListComponent(service,toastr);
    }
  };

  return builder;
}
