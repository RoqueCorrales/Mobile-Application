import { Login } from './../Models/Login';
import { Injectable } from '@angular/core';
import { GLOBAL } from '../global';

import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({'Content-type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }
  

  loginApi(user: Login): Observable<any> {
    let data = {
      email : user.email,
      password: user.password
    };
    let url = `${GLOBAL.url}/login`;
    console.log(url);
    console.log(data);
    return this.http.post(url, data, httpOptions);
  }
}
