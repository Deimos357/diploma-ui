import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {
  constructor() {} 

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = localStorage.getItem('token');
    if (token != null) {
      const authToken = 'Bearer ' + token;
      const authReq = req.clone({ setHeaders: { Authorization: authToken } });
      return next.handle(authReq);
    } else {
      return next.handle(req);
    }    
  }
}
