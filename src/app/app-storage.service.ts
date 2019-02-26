import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppStorageService {

  constructor() { }

    /**
     * @ngdoc method
     * @name saveToApp
     * @methodOf AppStorageService
     * @description saving data to app
     * @param key
     * @param data
     */

    saveToApp(key, data) {
    
      window.sessionStorage.setItem(key, data);
  }
  /**
   * @ngdoc method
   * @name getFromApp
   * @methodOf AppStorageService
   * @description getting the data from storage
   * @param key
   */

  getFromApp(key) {
      
      return  window.sessionStorage.getItem(key);
  }
  /**
   * @ngdoc method
   * @name deleteAll
   * @methodOf AppStorageService
   * @description clear all data from storage
   */

  deleteAll() {
     
      // Removes all values.
      window.sessionStorage.clear();
  }

deleteData(key) {

  // Removes all values.
  window.sessionStorage.removeItem(key);
}

  /**
   * @ngdoc method
   * @name isKeyExist
   * @methodOf AppStorageService
   * @description check the key
   */

  isKeyExist(key) {
      
      return window.sessionStorage.getItem(key) ? true : false  //.hasKey(key);
  }
}
