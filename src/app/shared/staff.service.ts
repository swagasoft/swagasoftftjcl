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

    getAllPenalty(){
      return this.http.get(environment.apiBaseUrl + '/get-all-penalty');
    }

    getAllStaff(){
      return this.http.get(environment.apiBaseUrl + '/get-all-staff');
    }

    getStaffByDepartment(department){
      return this.http.get(environment.apiBaseUrl + `/select-staff-depart${department}`);
    }



              
}
