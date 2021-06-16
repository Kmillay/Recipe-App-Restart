import { HttpClient, HttpHeaderResponse, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs/operators";
import { throwError, Subject } from "rxjs";

import { User } from './user.model'

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({providedIn: 'root'})
export class AuthService {
  user = new Subject<User>();

  constructor(private http: HttpClient) {}

  signup(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=AIzaSyCmnQK7tW_l0yjqzqptj3Yz182ewV_nT78',
    {
      email: email,
      password: password,
      returnSecureToken: true
    }
  ).pipe(
    catchError(this.handleError),
    // tap(resData => {
    //   this.handleAuthentication(
    //     resData.email,
    //     resData.localId,
    //     resData.idToken,
    //     +resData.expiresIn);
    // })
    )


    // .pipe(
    //   catchError(errorRes => {
    //   switch (errorRes.error.error.message) {
    //     let errorMessage = 'An unknown error occured.';
    //     if (!errorRes.error || !errorRes.error.error) {
    //       return throwError(errorMessage);
    //     }
    //     case 'EMAIL_EXISTS':
    //       errorMessage = 'This email is already in use';
    //   }
    //   return throwError(errorMessage);
    // })
    // )
    // commented this pipe method out to try Patrick's handle error on 6.15

    ;
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occured.';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage)};
      switch (errorRes.error.error.message) {
        case 'EMAIL_EXISTS':
          errorMessage = 'This email is already in use'
          break;
        case 'EMAIL_NOT_FOUND':
          errorMessage = 'This email was not found.'
          break;
        case 'INVALID_PASSWORD':
          errorMessage = 'Invalid Password.'
          break;
          case 'USER_DISABLED':
            errorMessage: 'This user has been disabled.'
            break;
      }
      return throwError(errorMessage);
  }

  login(email: string, password: string) {
   return this.http.post<AuthResponseData>(
     'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCmnQK7tW_l0yjqzqptj3Yz182ewV_nT78',
   {
    email: email,
    password: password,
    returnSecureToken: true
  }
).pipe(
  catchError(this.handleError),
  // tap(resData => {
  //   this.handleAuthentication(
  //     resData.email,
  //     resData.localId,
  //     resData.idToken,
  //     +resData.expiresIn);
  // })
  )
  }
}
