import { Observable } from 'rxjs';
import { UserServiceService } from './user-service.service';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})



export class OutletService {
outletSaver = [];
  loading = false;

  noAuthHeader = {headers: new HttpHeaders({NoAuth: 'True'})};
AuthHeader = {headers: new HttpHeaders().set('Authorization',
`Bearer ${localStorage.getItem('token')}`)};

  constructor(private http: HttpClient, public userService: UserServiceService) { }


  createOutlet(outlet){
    return this.http.post(environment.apiBaseUrl + '/create-outlet', outlet);
  }

  findAlloutlets(){
      return this.http.get(environment.apiBaseUrl + '/get-all-outlets');

   
  }

  getOutletForSupply(){
    return this.http.get(environment.apiBaseUrl + '/get-all-outlets');
  }


  deleteOutlet(id){
    return this.http.get(environment.apiBaseUrl + `/delete-outlet${id}`);
  }

  findOutletProperties(id){
    return this.http.get(environment.apiBaseUrl + `/get-oulet-properties${id}`);
  }

  searchOutlet(name){
    console.log(name);
    return this.http.post(environment.apiBaseUrl + '/search-outlet',name);
  }

  editOutlet(outlet){
    return this.http.post(environment.apiBaseUrl + `/edit-outlet`,outlet);
  }

  getAllMercahnt(){
    return this.http.get(environment.apiBaseUrl + '/get-all-merchant');
  }

  submitMerchantRecord(body){
    return this.http.post(environment.apiBaseUrl +'/submit-merchant-sales', body);
  }

  getSaleRecord(){
    return this.http.get(environment.apiBaseUrl + '/get-sales-record');
  }
  okSaleRecord(id){
    return this.http.get(environment.apiBaseUrl + `/ok-sales-record${id}`);
  }
  deleteRecord(id){
    return this.http.get(environment.apiBaseUrl + `/delete-sales-record${id}`);
  }
  verifySaleRecord(id){
    return this.http.get(environment.apiBaseUrl + `/verify-sales-record${id}`);
  }
  disproveRecord(id){
    return this.http.get(environment.apiBaseUrl + `/disprove-sales-record${id}`);
  }

  getMerchantRecord(name){
    return this.http.post(environment.apiBaseUrl + '/get-merchant-record', name);
  }

  findmerchantByMonth(ref){
    return this.http.post(environment.apiBaseUrl + '/merchant-date-bymonth', ref);
  }
   findmerchantByDay(ref){
    return this.http.post(environment.apiBaseUrl + '/merchant-date-day', ref);
  }

  updateMerchantRate(outlet){
    return this.http.post(environment.apiBaseUrl + '/update-merchant-rate', outlet);
  }

  findOutletSaleByCode(search){
    return this.http.post(environment.apiBaseUrl + '/find-outlet-sales', search);
  }

  resetMerchantPrice(data){
    return this.http.put(environment.apiBaseUrl + '/reset-merchant-price', data);
  }

  submitMerchantPro(data){
    return this.http.post(environment.apiBaseUrl + '/submit-merchant-pro', data);
  }
  getMerchantMonthly(data){
    return this.http.post(environment.apiBaseUrl + '/get-merchant-monthly', data);
  }

  updateBottles(data){
   return this.http.put(environment.apiBaseUrl + '/update-bottles', data);
  }
}
