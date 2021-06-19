import { HttpClient, HttpHeaderResponse, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs/operators";
import { throwError, BehaviorSubject } from "rxjs";

import { User } from './user.model'
import { Router } from "@angular/router";

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
  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;


  constructor(private http: HttpClient, private router: Router) {}

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
    tap(resData => {
      this.handleAuthentication(
        resData.email,
        resData.localId,
        resData.idToken,
        +resData.expiresIn);
    })
    );


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
  }

  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }

    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
      );

      if (loadedUser.token){
        this.user.next(loadedUser);
        const expirationDuration =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();
        this.autoLogout(expirationDuration);
      }
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    console.log(expirationDuration);
    this.tokenExpirationTimer = setTimeout( () => {
      this.logout();
    }, expirationDuration)
  }

  private handleAuthentication (
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(
      new Date().getTime() + expiresIn *1000);
    const user = new User(
      email,
      userId,
      token,
      expirationDate
    );
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
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
  tap(resData => {
    this.handleAuthentication(
      resData.email,
      resData.localId,
      resData.idToken,
      +resData.expiresIn
    );
  })
  );
  }
}
