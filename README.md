# Interceptor

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.


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



## Interceptor code using dummy json api jsonplaceholder
```javascript
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(req.url);
    return next.handle(req).pipe(
      catchError(error => {
        const newReq =  new HttpRequest('GET', 'https://jsonplaceholder.typicode.com/posts');
        return next.handle(newReq);
      }));
  }
}
```

catch the request after response in error callback and make new request and resend to handle


