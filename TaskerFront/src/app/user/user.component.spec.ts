import { UserService } from '../shared/services/user.service';
import { UserComponent } from './user.component';
import { autoSpy } from 'auto-spy';
import { of } from 'rxjs';

describe('UserDetailsComponent', () => {
  it('when ngOnInit is called it should', () => {
    // arrange
    const { build, userService } = setup().default();
    const u = build();
    userService.getAllUsers.and.returnValue(of({user: 'user'}))
    // act
    u.ngOnInit();
    // assert
    expect(u.allUsers).toBeTruthy();
  });
  
  it('when service get Allusers', () => {
    const { build, userService } = setup().default();
    const u = build();

    userService.getAllUsers.and.returnValue(of({}))
    u.ngOnInit()

    expect(u.allUsers).toEqual({})
  })
});

function setup() {
  const userService = autoSpy(UserService);
  const builder = {
    userService,
    default() {
      return builder;
    },
    build() {
      return new UserComponent(userService);
    }
  };

  return builder;
}
