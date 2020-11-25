import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { autoSpy } from 'auto-spy';

describe('UserService', () => {
  it('when register is called it should', () => {
    // arrange
    const { build } = setup().default();
    const u = build();
    // act
    u.register(null);
    // assert
    // expect(u).toEqual
  });
  it('when login is called it should', () => {
    // arrange
    const { build } = setup().default();
    const u = build();
    // act
    u.login(null);
    // assert
    // expect(u).toEqual
  });
  it('when logout is called it should', () => {
    // arrange
    const { build } = setup().default();
    const u = build();
    // act
    u.logout();
    // assert
    // expect(u).toEqual
  });
  it('when getUser is called it should', () => {
    // arrange
    const { build } = setup().default();
    const u = build();
    // act
    u.getUser();
    // assert
    // expect(u).toEqual
  });
  it('when getAllUsers is called it should', () => {
    // arrange
    const { build } = setup().default();
    const u = build();
    // act
    u.getAllUsers();
    // assert
    // expect(u).toEqual
  });
  
});

function setup() {
  const http = autoSpy(HttpClient);
const router = autoSpy(Router);
  const builder = {
    http,
router,
    default() {
      return builder;
    },
    build() {
      return new UserService(http,router);
    }
  };

  return builder;
}
