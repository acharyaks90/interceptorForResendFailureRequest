import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {catchError, tap, map, first} from 'rxjs/operators';

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
   this.loadData().subscribe(data=>{
     console.log(data);
   })
  }


  loadData():Observable<any>{
    let subject = new Subject<any>();
   this.http.get('https://jsonplaceholder.typicode.com/postjksfhdjk')
  //  .map(data=>{
  //    return data
  //  })
    
   .subscribe(data =>{ 
      
      this.jsData=data
        console.log(data)
        subject.next(1)}
    );

    return subject.asObservable();
  }


}
