# Interceptor

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.0. and Updated to 7.0.0

## Interceptor for managing request retry , token expired , refreshing token , authentication resend the request

Interceptor for managing request retry request in case of error or failure due to token expired , refreshing token ,
 authentication so resend the request, response on same 

## Request using http client  code 
...
```javascript
  export class AppComponent implements OnInit{
    title = 'app';
    jsData: any;
    constructor( private  http: HttpClient) {
    }
    ngOnInit() {
      this.http.get('https://jsonplaceholder.typicode.com/postsyy').subscribe(data=>this.jsData=data);
    }
  }
  ```
...



## Interceptor code for renew token 
```javascript
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

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
}
```

catch the request after response in error callback and make new request and resend to handle


