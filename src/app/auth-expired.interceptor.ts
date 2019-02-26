/**
 * Interceptor for handling response if session expired ot rejected or 401
 * currently not using handling in auth interceptor
 * @author asuryavanshi
 */
import {HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError, switchMap, tap } from 'rxjs/Operators';

import {Subject, throwError} from 'rxjs';
//import 'rxjs-compat/add/operator/do';

// @ts-ignore
//import {SERVER_API_URL} from './app.constants';
import {TokenService} from './token.service';
import {AppStorageService} from './app-storage.service';

export class AuthExpiredInterceptor implements HttpInterceptor {
  private subject: Subject<any> = new Subject<any>();
  private inProgress: boolean = false;

  constructor(
    private tokenService: TokenService,
    private appStorage: AppStorageService
  ) {
  }


  testSer(): Observable<any> {
    if (this.inProgress) {
      return Observable.create((observer) => {
        this.subject.subscribe((value) => {
          console.log(value);
          console.log('INSIDE IF');
          observer.next();
          observer.complete();
        });
      });
    } else {
      this.inProgress = true;
      return this.tokenService.getToken()
      .pipe(tap((data) => {
        console.log('data in progress testSer',data);
        this.test = data;
        this.inProgress = false;
        this.subject.next('1');
      }));
    }

  }


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // @ts-ignore
    return next.handle(request)
    .pipe(catchError(error => {
       console.log(error);
      if (error.status === 400 && error.error.errorCode == "INVALID_EXPIRED_TOKEN") {
         return this.testSer().pipe(
          switchMap(() => {
            const newToken = this.appStorage.getFromApp('accessToken');
            console.log('Getting the token from session storage in expired interceptor');
            request = request.clone({
              setHeaders: {
                Authorization: 'Bearer ' + newToken
              }
            });
            request = request.clone({url: request.url});
            return next.handle(request);
          }),
        );
      }

      return throwError(error);
    }))
    
  } // End of Interceptor
} // End of Class
