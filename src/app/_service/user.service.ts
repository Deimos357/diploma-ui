import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppSettings } from '../app-settings';
import { User } from '../_model/user';

@Injectable()
export class UserService {
  constructor(private http: HttpClient) { }

  registartion(user : User) {
    return this.http.post(AppSettings.host + '/core/v1/registration/email', user);
  }

  getCurrentUser() {
    return this.http.get<any>(AppSettings.host + '/core/v1/users/me')
      .pipe(map(response => {
        return response.data
      }));
  }
}
