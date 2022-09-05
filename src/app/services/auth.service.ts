import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { BehaviorSubject, catchError, Observable, tap, throwError } from "rxjs";
import { User } from "../models/user.model";
import { AuthResponse } from "../models/authResponse.model";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user: BehaviorSubject<User> = new BehaviorSubject(null);
  public tokenExpirationTimer: any;

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
  }

  public signUp(body: User): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.apiKey}`,
      {
        ...body,
        returnSecureToken: true,
      }
    ).pipe(
      catchError(this.handleError),
      tap((authResponse: AuthResponse) => {
        this.handleAuth(
          authResponse.email,
          authResponse.idToken,
          authResponse.localId,
          +authResponse.expiresIn,
        );
      })
    );
  }

  public logIn(body: User): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`,
      {
        ...body,
        returnSecureToken: true,
      }
    ).pipe(
      catchError(this.handleError),
      tap((authResponse: AuthResponse) => {
        this.handleAuth(
          authResponse.email,
          authResponse.idToken,
          authResponse.localId,
          +authResponse.expiresIn
        );
      }));
  }

  public autoLogin(): void {
    const userData = JSON.parse(localStorage.getItem('userData'));

    if (!userData) {
      return;
    }
    const loadedUser = new User(
      userData.email,
      userData._token,
      new Date(userData._tokenExpirationDate),
      userData.id,
    );

    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration =
        new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  public logout(): void {
    this.user.next(null);
    this.router.navigate(['auth']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  public autoLogout(expirationDuration: number): void {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration)
  }

  private handleAuth(email: string, idToken: string, localId: string, expiresIn: number, gender?: string) {
    const expiresInSec: number = expiresIn * 1000;
    const expirationDate: Date = new Date(new Date().getTime() + expiresInSec);
    const user = new User(email, idToken, expirationDate, localId);
    this.user.next(user);
    localStorage.setItem('userData', JSON.stringify(user));
    this.autoLogout(expiresInSec);
  }

  private handleError(errorResponse: HttpErrorResponse) {
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

    if (errorResponse.error || errorResponse.error.error) {
      return throwError(() => errorMessage);
    }
  }
}
