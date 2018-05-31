import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { AppSettings } from '../app-settings';

@Injectable()
export class AuthenticationService {
  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
      return this.http.post<any>(AppSettings.host + '/auth/v1/login/email', { email: email, password: password })
          .pipe(map(response => {
            localStorage.setItem('token', response.data.access_token);
          }));
  }

  public getToken(): string {
    return localStorage.getItem('token');
  }
}
