import { ExerciseDetailService } from '../../shared/services/exercise-detail.service';
import { ToastrService } from 'ngx-toastr';
import { ExerciseListComponent } from './exercise-list.component';
import { autoSpy } from 'auto-spy';
import { ExerciseDetail } from 'src/app/shared/models/exercise-detail.model';
import { of, throwError } from 'rxjs';

describe('ExerciseListComponent', () => {
  it('when ngOnInit is called it should', () => {
    // arrange
    const { build } = setup().default();
    const e = build();
    // act
    e.ngOnInit();
    // assert
    // expect(e).toEqual
  });
  it('when populateForm is called it should', () => {
    // arrange
    const { build } = setup().default();
    const e = build();
    // act
    e.populateForm(null);
    // assert
    // expect(e).toEqual
  });
  it('when onDelete is called it should', () => {
    // arrange
    const { build } = setup().default();
    const e = build();
    const spy = spyOn(e, 'logError')
    // act
    e.onDelete(1);
    // assert
    // expect(e).toEqual
  });

  it('should call LogError', () => {
    // arrange
    const { build } = setup().default();
    const e = build();
    const spy = spyOn(e, 'logError')
    // act
    e.onDelete(1);
    // assert
    expect(spy).toHaveBeenCalled();
  });

  it('should return empty list', () => {
    // arrange
    const { build, service } = setup().default();
    const e = build();
    service.list = []
    let result = e.Exercises;
    expect(result).toEqual([]);
  });

  it('OnDelete should subscibe error', () => {
    const { build, service } = setup().default();
    const e = build();
    
    service.delete.and.returnValue(throwError({}))

    e.onDelete(1)

    // expect(spy).toHaveBeenCalled();
  });

  it('OnDelete should subscibe responce', () => {
    const { build, service } = setup().default();
    const e = build();
    
    service.delete.and.returnValue(of({}))

    e.onDelete(1)

    // expect(spy).toHaveBeenCalled();
  });
  
});

function setup() {
  const service = autoSpy(ExerciseDetailService);
  const toastr = autoSpy(ToastrService);
  const builder = {
    service,
    toastr,
    list: [],
    default() {
      return builder;
    },
    build() {
      return new ExerciseListComponent(service,toastr);
    }
  };

  return builder;
}
