import { SpyOf } from './../../../../auto-spy';
import { Observable, of, Subscription, throwError } from 'rxjs';
import { UserService } from '../../shared/services/user.service';
import { Router } from '@angular/router';
import { LoginFormComponent } from './login-form.component';
import { autoSpy } from 'auto-spy';

describe('LoginFormComponent', () => {
  it('when ngOnInit is called it should', () => {
    // arrange
    const { build, servise } = setup().default();
    const l = build();
    // servise.
    // act
    l.ngOnInit();
    // assert
    // expect(l).toEqual
  });
  it('when ngOnDestroy is called it should unsubcribe', () => {
    // arrange
    const { build } = setup().default();
    const l = build();
    l.tokenSubscription = new Subscription();
    // act
    l.ngOnDestroy();
    // assert
    // expect(l).toEqual
  });
  it('when submit is called it should call setToken', () => {
    // arrange
    const { build, servise } = setup().default();
    const l = build();
    servise.login.and.returnValue(of(null));
    // const spy = spyOn(l, 'setToken');
    // act
    l.submit();
    // assert
    // expect(l.setToken).toHaveBeenCalled();
  });
  it('when submit is called it should call navigateToHome', () => {
    // arrange
    const { build, servise } = setup().default();
    const l = build();
    servise.login.and.returnValue(of({token: '123'}));
    const spy = spyOn(l, 'navigateToHome');
    // act
    l.submit();
    // assert
    expect(spy).toHaveBeenCalled();
  });
  it('when submit is called it should set error message', () => {
    // arrange
    const { build, servise } = setup().default();
    const l = build();
    servise.login.and.returnValue(throwError({error: {message: 'error message'}}))
    // act
    l.submit();
    // assert
    expect(l.error).toEqual('error message');
  });
  it('when isAuthenticated is called it should', () => {
      // arrange
      const { build } = setup().default();
      const l = build();
      // act
      l.setToken('123')
      let result = l.isAuthenticated();
      // assert
      expect(result).toBeUndefined();
  });
  it('when isAuthenticated is called it log that you need to login ', () => {
      // arrange
      const { build } = setup().default();
      const l = build();
      localStorage.removeItem('token');
      // act
      l.isAuthenticated();
      // assert
  });
  it('when checkToken is called it should return false', () => {
      // arrange
      const { build } = setup().default();
      const l = build();
      // act
      localStorage.removeItem('token');
      const result = l.checkToken();
      // assert
      expect(result).toBeFalse()
  });
  it('when checkToken is called it should return true', () => {
      // arrange
      const { build } = setup().default();
      const l = build();
      l.setToken('123');
      // act
      const result = l.checkToken();
      // assert
      expect(result).toBeTrue()
  });
  it('when navigateToHome is called it should', () => {
      // arrange
      const { build } = setup().default();
      const l = build();
      // act
      l.navigateToHome();
      // assert
      // expect(c).toEqual
  });
  it('when setToken is called it should', () => {
      // arrange
      const { build } = setup().default();
      const l = build();
      // act
      l.setToken(null);
      // assert
      // expect(c).toEqual
  });
  
});

function setup() {
  const servise = autoSpy(UserService);
const router = autoSpy(Router);
  const builder = {
    servise,
router,
    default() {
      localStorage.setItem('tokey', '123');
      return builder;
    },
    build() {
      return new LoginFormComponent(servise,router);
    }
  };

  return builder;
}
