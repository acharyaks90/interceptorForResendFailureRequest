import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {catchError, tap, map} from 'rxjs/operators';
import {GetTokenService} from './get-token.service';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private getToken: GetTokenService ){

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(req.url);
    return next.handle(req).pipe(
      catchError(error => {
        console.log(error);
        req = req.clone({url: 'https://jsonplaceholder.typicode.com/posts'})
        const newReq =  new HttpRequest('GET', 'https://jsonplaceholder.typicode.com/posts');
        this.getToken.getToken()
          .pipe(map(data=>{
            return next.handle(newReq);
          }))
          .subscribe(data=>{
          console.log(data);
          });
        // return next.handle(newReq); //optional

      }));
  }
}

