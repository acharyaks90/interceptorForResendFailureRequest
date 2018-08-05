import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app';
  jsData: any;

  constructor( private  http: HttpClient) {

  }

  ngOnInit() {
    this.http.get('https://jsonplaceholder.typicode.com/postsyy').subscribe(data=>this.jsData=data);
  }
}
