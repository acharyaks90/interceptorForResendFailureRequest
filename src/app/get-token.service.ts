
import { Injectable } from '@angular/core';
import { tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {AppStorageService} from './app-storage.service';
import {throwError} from 'rxjs';
import { SERVER_API_URL } from './app.constant';


/**
 * Token Service  for handing  token renew , refresh , authorization
 */
@Injectable({
    providedIn: 'root'
})
export class TokenService {

    constructor( private appStorage: AppStorageService,
                 private http: HttpClient
                 // private router: Router
                 ) { }

    /**
     * @ngdoc method
     * @name getToken
     * @methodOf TokenService
     * @description
     * This method is used to get a new access token using refresh token, if refresh token is expired,  take the user to signin page
     * @returns {Array} It returns deferred response
     */

    getToken() {
        console.log('TokenService: getToken called');
        this.appStorage.saveToApp('tokenAPI', 'accesstoken');
        let tokenUrl: string ;
        let model: any;
            tokenUrl =  SERVER_API_URL + 'auth/renew';
            model = {
                'refreshToken': this.appStorage.getFromApp('refreshToken') || null,
                'accessToken' : this.appStorage.getFromApp('accessToken') || null,
            };
            this.appStorage.saveToApp('newTokenCalled', 'true');

        return this.http.post(tokenUrl, model).pipe(tap((res: any) => {
          console.log('Tap token service')
            if (res && res.data === 'SESSION_EXPIRED' ) {
                console.log('TokenService: SESSION_EXPIRED');
                this.logout();
            }
            if (res.isSuccess) {
                console.log('TokenService: Success');
                this.appStorage.saveToApp('accessToken', res.data.accessToken);
                if (res.data.refreshToken) {
                    this.appStorage.saveToApp('refreshToken', res.data.refreshToken );
                }
                this.appStorage.saveToApp('newTokenCalled', 'false');
            } else {
                if (this.appStorage.getFromApp('tokenAPI') === 'newAccessToken') {
                    this.logout();
                }
            }
        }));
    }

    public handleError(error) {

    return throwError(error);
  }


    /**
     * @ngdoc method
     * @name logout
     * @methodOf TokenService
     * @description
     * This method is used for logout App
     */
    logout() {
        console.log('TokenService: logout called');
       // this.router.navigate(['/login']);
    }
}
