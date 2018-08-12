import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import {AuthInterceptor} from './auth.interceptor';
import {GetTokenService} from './get-token.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [GetTokenService,
              {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor,
                multi: true,
                deps: [
                  GetTokenService
                ]}],
  bootstrap: [AppComponent]
})
export class AppModule { }
