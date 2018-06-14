import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppSettings } from '../app-settings';
import { User } from '../_model/user';

@Injectable()
export class UserService {
  user: User;

  constructor(private http: HttpClient) { }

  registartion(user: User) {
    return this.http.post(AppSettings.host + '/core/v1/registration/email', user);
  }

  getCurrentUser() {
    return this.http.get<any>(AppSettings.host + '/core/v1/users/me')
      .pipe(map(response => {
        return response.data
      }));
  }

  update(user: User) {
    this.user = user;
  }

  edit(user: User) {
    return this.http.put(AppSettings.host + '/core/v1/users/me', user);
  }

  changePassword(oldPas: string, newPas: string) {
    return this.http.post(AppSettings.host + '/core/v1/users/change-password', {
      'oldPassword': oldPas,
      'newPassword': newPas
    });
  }

  delete() {
    return this.http.delete(AppSettings.host + '/core/v1/users/me');
  }
}
