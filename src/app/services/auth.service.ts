import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { catchError, Observable, throwError } from "rxjs";
import { SignupResponse } from "../models/signupResponse.model";
import { User } from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  public signUp(body: User): Observable<SignupResponse> {
    return this.http.post<SignupResponse>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.apiKey}`,
      {
        ...body,
        returnSecureToken: true
      }
    ).pipe(catchError(error => {
      let errorMessage: string;

      switch (error.error.error.message) {
        case 'EMAIL_EXISTS':
          errorMessage = 'This email already exists';
          break;
        case 'OPERATION_NOT_ALLOWED':
          errorMessage = 'Password sign-in is disabled for this project';
          break;
        case 'TOO_MANY_ATTEMPTS_TRY_LATER':
          errorMessage = 'We have blocked all requests from this device due to unusual activity. Try again later';
          break;
        default:
          errorMessage = 'An unknown error occurred!';
      }

      if (error.error || error.error.error) {
        return throwError(() => errorMessage);
      }
    }))
  }
}
