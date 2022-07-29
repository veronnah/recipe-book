import { Action } from '@ngrx/store';
import { User } from '../../../models/user.model';

export const LOGIN_START = '[Auth] Login Start';
export const LOGIN_SUCCESS = '[Auth] Login Success';
export const LOGIN_FAIL = '[Auth] Login Fail';
export const AUTO_LOGIN = '[Auth] Auto Login';
export const SIGNUP_START = '[Auth] Signup Start';
export const LOGOUT = '[Auth] Logout';

export class LoginStart implements Action {
  readonly type = LOGIN_START;

  constructor(public payload: User) {
  }
}

export class LoginSuccess implements Action {
  readonly type = LOGIN_SUCCESS;

  constructor(public payload: User) {
  }
}

export class LoginFail implements Action {
  readonly type = LOGIN_FAIL;

  constructor(public payload: string) {
  }
}

export class AutoLogin implements Action {
  readonly type = AUTO_LOGIN;
}

export class SignupStart implements Action {
  readonly type = SIGNUP_START;

  constructor(public payload: User) {
  }
}

export class Logout implements Action {
  readonly type = LOGOUT;
}


export type AuthActions =
  | LoginStart
  | LoginSuccess
  | LoginFail
  | AutoLogin
  | SignupStart
  | Logout;
