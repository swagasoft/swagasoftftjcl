import { UserServiceService } from './user-service.service';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RecordService {
  noAuthHeader = {headers: new HttpHeaders({NoAuth: 'True'})};
AuthHeader = {headers: new HttpHeaders().set('Authorization',
`Bearer ${localStorage.getItem('token')}`)};

loading = false;
myDate = new Date();
fruitRecord = [];
fruitSaver = [];
salesSaver = [];

  constructor(private http: HttpClient, private userService: UserServiceService) { }

  submitFruit(fruit){
    return this.http.post(environment.apiBaseUrl + '/submit-fruit', fruit);
  }
  editFruit(fruit){
    return this.http.post(environment.apiBaseUrl + '/edit-fruit-sm', fruit);
  }
   getFruit(){
    return this.http.get(environment.apiBaseUrl + '/get-fruit-record');
  }
  verifyFruit(id){
    return this.http.get(environment.apiBaseUrl + `/verify-fruit${id}`);
  }
  disprove(id){
    return this.http.get(environment.apiBaseUrl + `/disprove-fruit-record${id}`);
  }
  okFruitRecord(id){
    return this.http.get(environment.apiBaseUrl + `/ok-fruit-record${id}`);
  }
  UnOkFruitRecord(id){
    return this.http.get(environment.apiBaseUrl + `/un-ok-fruit-record${id}`);
  }

  findBydate(date){
    return this.http.post(environment.apiBaseUrl + '/find-fruit-by-date', date);
  }

  thisMonthFruit(month){ 
      return this.http.post(environment.apiBaseUrl + '/this-month-fruit', month);
 
  
  }

  reloadThisMonthFruit(month){ 
    return this.http.post(environment.apiBaseUrl + '/this-month-fruit', month);
  }

  merchantSales(date){
      return this.http.post(environment.apiBaseUrl + '/merchant-sales', date)
  
  }


  findmerchantByDay(ref){
    this.loading = true;
    return this.http.post(environment.apiBaseUrl + '/merchant-date-day', ref);
  }


  
  reloadMerchantSales(date){
    return this.http.post(environment.apiBaseUrl + '/merchant-sales', date);
  }

}


 