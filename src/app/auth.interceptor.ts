import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(req.url);
    return next.handle(req).pipe(
      catchError(error => {
        console.log(error);
        req = req.clone({url: 'https://jsonplaceholder.typicode.com/posts'})
        const newReq =  new HttpRequest('GET', 'https://jsonplaceholder.typicode.com/posts');
        return next.handle(newReq);
      }));
  }
}

