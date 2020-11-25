import { UserBody } from './../../shared/models/userBody';
import { of, Subscription, throwError } from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { UserService } from '../../shared/services/user.service';
import { Router } from '@angular/router';
import { TosterNotificationsService } from './../../shared/services/toster-notifications.service';
import { RegistrationFormComponent } from './registration-form.component';
import { autoSpy } from 'auto-spy';

describe('RegistrationFormComponent', () => {
  it('when ngOnDestroy is called it should unsubscribe', () => {
    // arrange
    const { build } = setup().default();
    const r = build();
    r.subscription = new Subscription();
    // act
    r.ngOnDestroy();
    // assert
    expect(r.subscription.closed).toBeTrue();
  });
  it('when ComparePasswords is called it should return true', () => {
    // arrange
    const { build } = setup().default();
    const r = build();
    let builder = new FormBuilder();
    let fb = builder.group({
      Password: ['Password'],
      ConfirmPassword: ['Password']
    })
    // act
    let result = r.ComparePasswords(fb);
    // assert
    expect(result).toBeTrue();
  });
  it('when ComparePasswords is called it should return false', () => {
    // arrange
    const { build } = setup().default();
    const r = build();
    let builder = new FormBuilder();
    let fb = builder.group({
      Password: ['Password'],
      ConfirmPassword: ['Passwordddd']
    })
    // act
    let result = r.ComparePasswords(fb);
    // assert
    expect(result).toBeFalse();
  });

  it('when Submit is called it should subscription should equal', () => {
    // arrange
    const { build } = setup().default();
    const r = build();
    spyOn(r, 'subscribeRegistration').and.returnValue(new Subscription)
    spyOn(r, 'registerUserMapping').and.returnValue({} as UserBody)
    const spy1 = spyOn(r, 'clearErrorList')
    r.subscription = new Subscription()

    r.Submit();
    // assert
    expect(spy1).toHaveBeenCalled();
    expect(r.subscription.closed).toBeFalse();
  });

  it('when ConfirmPassword is called it shuold return correct information', () => {
    const { build, userServise } = setup().default();
    const r = build();

    let formBuilder = new FormBuilder();
    let form = formBuilder.group({
    Passwords: formBuilder.group({
      Password: [''],
      ConfirmPassword: ['confirm']
    })})
    r.formModel = form

    let result = r.ConfirmPassword.value;

    expect(result).toEqual('confirm')
  })

  it('when subscribeRegistration is called it should set corresponding responce', () => {
    // arrange
    const { build, userServise } = setup().default();
    const r = build();
    const res = {res: 'responce object'}
    userServise.register.and.returnValue(of(res))
    // act
    r.subscribeRegistration(null);
    // assert
    expect(r.responce).toEqual(res)
  });
  it('when subscribeRegistration is called it should get error and push to array', () => {
    // arrange
    const { build, userServise } = setup().default();
    const r = build();
    userServise.register.and.returnValue(throwError({error:{message: [{Description:'message'}]} }))
    // act
    r.subscribeRegistration(null);
    // assert
    expect(r.errors.length).toBeGreaterThanOrEqual(1);
  });
  it('when clearErrorList is called it should clear errors array', () => {
    // arrange
    const { build } = setup().default();
    const r = build();
    // act
    r.clearErrorList();
    // assert
    expect(r.errors.length).toEqual(0)
  });
  it('when registerUserMapping is called it should return instance of USerBody', () => {
    // arrange
    const { build } = setup().default();
    const r = build();
    let formBuilder = new FormBuilder();
    r.formModel = formBuilder.group({
      UserName: [''],
      Email: [''],
      FullName: [''],
      Passwords: formBuilder.group({
        Password: [''],
        ConfirmPassword: ['']
      })})
    // act
    const result = r.registerUserMapping();
    // assert
    expect(result).toBeTruthy();
  });
  it('when pushErrorMessage is called it should push error to array', () => {
    // arrange
    const { build } = setup().default();
    const r = build();
    r.errors = []
    // act
    r.pushErrorMessage({error:{message: [{Description:'message'}]} });
    // assert
    expect(r.errors).toContain('message');
  });
  
});

function setup() {
  const formBuilder = autoSpy(FormBuilder);
  const userServise = autoSpy(UserService);
  const router = autoSpy(Router);
  const toster = autoSpy(TosterNotificationsService);
  const builder = {
    formBuilder,
    userServise,
    router,
    toster,
    default() {
      return builder;
    },
    build() {
      return new RegistrationFormComponent(formBuilder,userServise,router,toster);
    }
  };
  return builder;
}
