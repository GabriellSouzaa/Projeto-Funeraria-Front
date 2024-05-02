import { HttpInterceptorFn } from '@angular/common/http';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    let token: string = localStorage.getItem('token') ?? '';

    let tokenRequest: HttpRequest<any>;

    if (token != null) {
      tokenRequest = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`},
      });
    } else {
      tokenRequest = req.clone()
    }

    return next.handle(tokenRequest);
  }
}
