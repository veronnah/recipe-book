import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import * as AuthActions from './auth.actions';
import { AuthResponse } from '../../../models/authResponse.model';
import { environment } from '../../../../environments/environment';

@Injectable()
export class AuthEffects {
  @Effect() authLogin = this.actions$.pipe(
    ofType(AuthActions.LOGIN_START),
    switchMap((authData: AuthActions.LoginStart) => {
      console.log(authData)
      return this.http.post<AuthResponse>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`,
        {
          ...authData.payload,
          returnSecureToken: true,
        }
      ).pipe(
        map((resData: AuthResponse) => {
          const expirationDate: Date = new Date(new Date().getTime() + +resData.expiresIn * 1000);
          return new AuthActions.LoginSuccess({
            email: resData.email,
            id: resData.idToken,
            tokenExpirationDate: expirationDate,
            token: resData.localId,
          })
        }),
        catchError(errorResponse => {
          let errorMessage: string;
          console.log(errorResponse)

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
        }),
      )
    }),
  );

  @Effect({ dispatch: false })
  authSuccess = this.actions$.pipe(
    ofType(AuthActions.LOGIN_SUCCESS),
    tap(() => {
      this.router.navigate(['/']).then();
    })
  )

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
  ) {
  }
}
