import { ExerciseDetailService } from '../../shared/services/exercise-detail.service';
import { ToastrService } from 'ngx-toastr';
import { ExerciseListComponent } from './exercise-list.component';
import { autoSpy } from 'auto-spy';

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

  it('', () => {
    // arrange
    const { build } = setup().default();
    const e = build();
    const spy = spyOn(e, 'logError')
    // act
    e.onDelete(1);
    // assert
    expect(spy).toHaveBeenCalled();
  });
});

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
      return new ExerciseListComponent(service,toastr);
    }
  };

  return builder;
}
