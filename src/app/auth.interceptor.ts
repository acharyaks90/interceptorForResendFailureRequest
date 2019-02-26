/**
 * Interceptor for appending the auth token to each request and handling the after response
 */
import {HttpEvent, HttpInterceptor, HttpRequest, HttpHandler} from '@angular/common/http';
import {Observable} from 'rxjs';
import { AppStorageService } from './app-storage.service';


export class AuthInterceptor implements HttpInterceptor {
  constructor(private appStorage: AppStorageService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!request || !request.url ||  (request.url.includes('auth/renew') ) ) {
      return next.handle(request);  // ||  (request.url.startsWith(SERVER_API_URL) && request.url.indexOf('getaccesstoken') > -1) now server api loader from app settings
    }

    const token = this.appStorage.isKeyExist('accessToken') ?  this.appStorage.getFromApp('accessToken') : null;
    console.log('Setting token in interceptor')
    if (!!token) {
      request = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + token
        }
      });
    }
    return next.handle(request);
  }


}