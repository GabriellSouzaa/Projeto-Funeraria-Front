import { HttpInterceptorFn } from '@angular/common/http';

export const funerariaInterceptor: HttpInterceptorFn = (req, next) => {
  
  if (req.url.includes('/login' || '/register')) {
    return next(req); 
  }

  const authToken = localStorage.getItem('token');

  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${authToken}`
    }
  });

  return next(authReq);
};