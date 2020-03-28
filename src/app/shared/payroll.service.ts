import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})


export class PayrollService {

  noAuthHeader = {headers: new HttpHeaders({NoAuth: 'True'})};
  AuthHeader = {headers: new HttpHeaders().set('Authorization',
  `Bearer ${localStorage.getItem('token')}`)};
  
 

  constructor(private http: HttpClient) {

   }

  

  
   getAllStaff(){
     return this.http.get(environment.apiBaseUrl + '/get-all-staff');
   }
   
   getAllStaffPayout(){
     console.log('from service')
     return this.http.get(environment.apiBaseUrl + '/get-all-payout');
   }

   setTofalse(id){
     return this.http.get(environment.apiBaseUrl  + `/set-payment-false${id}`);
   }
   setToTrue(id){
     return this.http.get(environment.apiBaseUrl  + `/set-payment-true${id}`);
   }

   resetPayroll(){
     return this.http.get(environment.apiBaseUrl + '/reset-payroll');
   }

   
   notPaidStaff(id){
    return this.http.get(environment.apiBaseUrl + `/not-paid${id}`);
  }

  searchName(name){
    return this.http.post(environment.apiBaseUrl + '/search-staff-name', name);
  }

  getPayRecord(date){
    return this.http.post(environment.apiBaseUrl + '/get-pay-record', date);
  }

  recordByDepartment(department){
    return this.http.post(environment.apiBaseUrl + '/record-department', department);
  }

   logDate(event){
     console.log(event);
   }
}
