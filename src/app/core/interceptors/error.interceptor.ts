import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { LoginService } from '../services/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private loginService: LoginService,
    private snackbar: MatSnackBar
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err) => {
        if (err.status === 401) {
          // auto logout if 401 response returned from api
          this.loginService.logout();
          // tslint:disable-next-line: deprecation
          // location.reload(true);
          this.snackbar.open('Username or Password incorrect.', 'x', {
            duration: 3000,
            panelClass: 'notif-error',
          });
        }

        const error = err.message || err.statusText;
        return throwError(error);
      })
    );
  }
}
