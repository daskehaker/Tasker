import { ToastrService } from 'ngx-toastr';
import { TosterNotificationsService } from './toster-notifications.service';
import { autoSpy } from 'auto-spy';

describe('TosterNotificationsService', () => {
  it('when create is called it should', () => {
    // arrange
    const { build } = setup().default();
    const t = build();
    // act
    t.create('');
    // assert
    // expect(t).toEqual
  });
  it('when update is called it should', () => {
    // arrange
    const { build } = setup().default();
    const t = build();
    // act
    t.update();
    // assert
    // expect(t).toEqual
  });
  it('when delete is called it should', () => {
    // arrange
    const { build } = setup().default();
    const t = build();
    // act
    t.delete();
    // assert
    // expect(t).toEqual
  });
  
});

function setup() {
  const toastr = autoSpy(ToastrService);
  const builder = {
    toastr,
    default() {
      return builder;
    },
    build() {
      return new TosterNotificationsService(toastr);
    }
  };

  return builder;
}
