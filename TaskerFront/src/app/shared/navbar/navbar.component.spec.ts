import { ProjectService } from './../services/project.service';
import { UserService } from '../services/user.service';
import { NavbarComponent } from './navbar.component';
import { autoSpy } from 'auto-spy';

describe('NavbarComponent', () => {
  it('when logout is called it should', () => {
    // arrange
    const { build } = setup().default();
    const n = build();
    // act
    n.logout();
    // assert
    // expect(n).toEqual
  });

  it('should return localstorage', () => {
    const { build } = setup().default();
    const n = build();
    
    expect(n.localStorage).toBe(localStorage);
  })
});

function setup() {
  const servise = autoSpy(UserService);
  const builder = {
    servise,
    default() {
      return builder;
    },
    build() {
      return new NavbarComponent(servise);
    }
  };

  return builder;
}
