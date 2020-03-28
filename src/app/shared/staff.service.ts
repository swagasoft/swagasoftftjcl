import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { AlertController, ToastController } from '@ionic/angular';
// import { Network } from '@ionic-native/network';

@Injectable({
  providedIn: 'root'
})
export class StaffService {
staffList = [];


noAuthHeader = {headers: new HttpHeaders({NoAuth: 'True'})};
AuthHeader = {headers: new HttpHeaders().set('Authorization',
`Bearer ${localStorage.getItem('token')}`)};


  constructor(private http: HttpClient, 
              public alertController: AlertController,
              public toastController: ToastController,
              private router: Router) {
              
               }
 
              
    deleteExpense(id){
      return this.http.get(environment.apiBaseUrl + `/delete-expense${id}`);
    }
    submitStaff(form){
      return this.http.post(environment.apiBaseUrl +'/submit-staff', form);
    }

    deleteTaff(id){
      return this.http.get(environment.apiBaseUrl + `/delete-staff${id}`);
    }

    penalizeStaff(body){
      return this.http.post(environment.apiBaseUrl + '/penalize-staff', body);
    }

    salaryAdvance(body){
      return this.http.post(environment.apiBaseUrl + '/salary-advance', body);
    }

    getAllSalaryAdvance(){
      return this.http.get(environment.apiBaseUrl + '/get-salary-adv');
    }

    deleteSalaryAdvance(body){
      return this.http.post(environment.apiBaseUrl + '/delete-salary-advance', body);
    }
     editPenalty(body){
      return this.http.post(environment.apiBaseUrl + '/edit-penalty', body);
    }

    getAllPenalty(){
      return this.http.get(environment.apiBaseUrl + '/get-all-penalty');
    }

    getAllStaff(){
      return this.http.get(environment.apiBaseUrl + '/get-all-staff');
    }

    searchStaff(staff){
      return this.http.post(environment.apiBaseUrl + '/search-staff-name', staff);
    }
     getLimitStaff(){
      return this.http.get(environment.apiBaseUrl + '/get-limit-staff');
    }

    thismonthRecord(date){
      return this.http.post(environment.apiBaseUrl + '/this-month-advs', date);

    }

    getStaffByDepartment(department){
      return this.http.get(environment.apiBaseUrl + `/select-staff-depart${department}`);
    } 
       getPayoutByDepartment(department){
      return this.http.get(environment.apiBaseUrl + `/select-payout-depart${department}`);
    }

    findSalaryAdvbyDate(date){
      return this.http.post(environment.apiBaseUrl +'/find-salary-advbydate', date);
    }
    findPenaltyDate(date){
      return this.http.post(environment.apiBaseUrl +'/find-penalty-date', date);
    }

    wavePenalty(id){
      return this.http.get(environment.apiBaseUrl + `/wave-penalty${id}`);
    } 
     deletePenalty(id){
      return this.http.get(environment.apiBaseUrl + `/delete-penalty${id}`);
    }

    searchPenalty(name){
      return this.http.post(environment.apiBaseUrl + '/search-penalty',name);
    }

    thisMonthPenalty(date){
      return this.http.post(environment.apiBaseUrl + '/this-month-penalty', date);
    }
     searchAdvsalary(name){
      return this.http.post(environment.apiBaseUrl + '/search-adv-salary',name);
    }

    settleSalary(salary){
      return this.http.post(environment.apiBaseUrl + '/settle-salary', salary);
    }

    verifyPenal(id){
      return this.http.get(environment.apiBaseUrl + `/verify-penalty${id}`);
    }
    unVerifyPenal(id){
      return this.http.get(environment.apiBaseUrl + `/un-verify-penalty${id}`);
    }

    confirmPenal(id){
      return this.http.get(environment.apiBaseUrl + `/confirm-penalty${id}`);
    }
    
    unConfirmPenal(id){
      return this.http.get(environment.apiBaseUrl + `/un-confirm-penalty${id}`);
    }
   



              
}
