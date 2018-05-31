import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppSettings } from '../app-settings';

@Injectable()
export class UserService {
  constructor(private http: HttpClient) { }

  getCurrentUser() {
    return this.http.get<any>(AppSettings.host + '/core/v1/users/me')
      .pipe(map(response => {
        return response.data
      }));
  }
}
