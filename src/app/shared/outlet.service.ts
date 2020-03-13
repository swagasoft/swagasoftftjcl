import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})



export class OutletService {

  noAuthHeader = {headers: new HttpHeaders({NoAuth: 'True'})};
AuthHeader = {headers: new HttpHeaders().set('Authorization',
`Bearer ${localStorage.getItem('token')}`)};

  constructor(private http: HttpClient) { }


  createOutlet(outlet){
    return this.http.post(environment.apiBaseUrl + '/create-outlet', outlet);
  }

  findAlloutlets(){
    return this.http.get(environment.apiBaseUrl + '/get-all-oulets');
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

  editOutlet(id){
    return this.http.get(environment.apiBaseUrl + `/edit-outlet${id}`);
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

  getMerchantRecord(name){
    return this.http.post(environment.apiBaseUrl + '/get-merchant-record', name);
  }

  findmerchantByMonth(ref){
    return this.http.post(environment.apiBaseUrl + '/merchant-date-bymonth', ref);
  }
   findmerchantByDay(ref){
    return this.http.post(environment.apiBaseUrl + '/merchant-date-day', ref);
  }
}
