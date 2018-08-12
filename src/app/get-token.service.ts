import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetTokenService {

  constructor( private http: HttpClient ) { }

  getToken(){

    return this.http.get('http://jsonplaceholder.typicode.com/posts/2')
  }
}
