import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import * as AuthActions from './auth.actions';
import { AuthResponse } from '../../../models/authResponse.model';
import { environment } from '../../../../environments/environment';
import { User } from '../../../models/user.model';
import { AuthService } from '../auth.service';

const handleAuth = (
  email: string,
  idToken: string,
  localId: string,
  expiresIn: number
) => {
  const expirationDate: Date = new Date(new Date().getTime() + expiresIn * 1000);
  const user = new User(
    email,
    idToken,
    expirationDate,
    localId,
  )
  localStorage.setItem('userData', JSON.stringify(user));
  return new AuthActions.LoginSuccess(user);
}

const handleError = (errorResponse: HttpErrorResponse) => {
  let errorMessage: string;

  switch (errorResponse.error.error.message) {
    case 'EMAIL_EXISTS':
      errorMessage = 'This email already exists';
      break;
    case 'OPERATION_NOT_ALLOWED':
      errorMessage = 'Password sign-in is disabled for this project';
      break;
    case 'TOO_MANY_ATTEMPTS_TRY_LATER':
      errorMessage = 'We have blocked all requests from this device due to unusual activity. Try again later';
      break;
    case 'EMAIL_NOT_FOUND':
      errorMessage = 'Email does not exists';
      break;
    case 'INVALID_PASSWORD':
      errorMessage = 'Invalid password';
      break;
    default:
      errorMessage = 'An unknown error occurred!';
  }
  return of(new AuthActions.LoginFail(errorMessage));
}

@Injectable()
export class AuthEffects {
  @Effect()
  authSignup = this.actions$.pipe(
    ofType(AuthActions.SIGNUP_START),
    switchMap((signupAction: AuthActions.SignupStart) => {
      return this.http.post<AuthResponse>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.apiKey}`,
        {
          ...signupAction.payload,
          returnSecureToken: true,
        }
      ).pipe(
        tap((resData: AuthResponse) => {
          this.authService.setLogoutTimer(+resData.expiresIn * 1000);
        }),
        map((resData: AuthResponse) => {
          return handleAuth(
            resData.email,
            resData.idToken,
            resData.localId,
            +resData.expiresIn
          );
        }),
        catchError(errorResponse => {
          return handleError(errorResponse);
        }),
      )
    })
  );

  @Effect()
  authLogin = this.actions$.pipe(
    ofType(AuthActions.LOGIN_START),
    switchMap((authData: AuthActions.LoginStart) => {
      return this.http.post<AuthResponse>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`,
        {
          ...authData.payload,
          returnSecureToken: true,
        }
      ).pipe(
        tap((resData: AuthResponse) => {
          this.authService.setLogoutTimer(+resData.expiresIn * 1000);
        }),
        map((resData: AuthResponse) => {
          return handleAuth(
            resData.email,
            resData.idToken,
            resData.localId,
            +resData.expiresIn
          );
        }),
        catchError(errorResponse => {
          return handleError(errorResponse);
        }),
      )
    }),
  );

  @Effect()
  autoLogin = this.actions$.pipe(
    ofType(AuthActions.AUTO_LOGIN),
    map(() => {
      const userData = JSON.parse(localStorage.getItem('userData'));

      if (!userData) {
        return { type: 'empty type' };
      }
      const loadedUser = new User(
        userData.email,
        userData._token,
        new Date(userData._tokenExpirationDate),
        userData.id,
      );

      if (loadedUser.token) {
        const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
        this.authService.setLogoutTimer(expirationDuration);
        return new AuthActions.LoginSuccess(loadedUser);
      }
      return { type: 'empty type' };
    })
  )

  @Effect({ dispatch: false })
  authRedirect = this.actions$.pipe(
    ofType(AuthActions.LOGIN_SUCCESS),
    tap(() => {
      this.router.navigate(['/']).then();
    })
  )

  @Effect({ dispatch: false })
  authLogout = this.actions$.pipe(
    ofType(AuthActions.LOGOUT),
    tap(() => {
      this.authService.clearLogoutTimer();
      localStorage.removeItem('userData');
      this.router.navigate(['auth']);
    })
  )

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService,
  ) {
  }
}
