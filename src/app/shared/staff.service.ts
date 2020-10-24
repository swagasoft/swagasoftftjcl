import { UserServiceService } from 'src/app/shared/user-service.service';
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
penaltySaver = [];
staffSaver = [];
nigeriaState =[
  {value :"ABIA", name: "ABIA"},
  {value :"ABUJA", name: "ABUJA"},
  {value:"ADAMAWA",name:"ADAMAWA"},
  {value:"AKWA_IBOM", name:"AKWA IBOM"},
  {value:"ANAMBRA", name:"ANAMBRA"},
  {value:"BAUCHI", name:"BAUCHI"},
  {value:"BAYELSA", name:"BAYELSA"},
  {value:"BENUE", name:"BENUE"},
  {value:"BORNO", name:"BORNO"},
  {value:"CROSS_RIVER", name:"CROSS RIVER"},
  {value:"DELTA", name:"DELTA"},
  {value:"EBONYI", name:"EBONYI"},
  {value:"EDO", name:"EDO"},
  {value:"EKITI", name:"EKITI"},
  {value:"ENUGU", name:"ENUGU"},
  {value:"GOMBE", name:"GOMBE"},
  {value:"IMO", name:"IMO"},
  {value:"JIGAWA", name:"JIGAWA"},
  {value:"KADUNA", name:"KADUNA"},
  {value:"KANO", name:"KANO"},
  {value:"KATSINA", name:"KATSINA"},
  {value:"KEBBI", name:"KEBBI"},
  {value:"KOGI", name:"KOGI"},
  {value:"KWARA", name:"KWARA"},
  {value:"LAGOS", name:"LAGOS"},
  {value:"NASARAWA", name:"NASARAWA"},
  {value:"NIGER", name:"NIGER"},
  {value:"OGUN", name:"OGUN"},
  {value:"ONDO", name:"ONDO"},
  {value:"OSUN", name:"OSUN"},
  {value:"OYO", name:"OYO"},
  {value:"PLATEAU", name:"PLATEAU"},
  {value:"RIVERS", name:"RIVERS"},
  {value:"SOKOTO", name:"SOKOTO"},
  {value:"SOKOTO", name:"SOKOTO"},
  {value:"TARABA", name:"TARABA"},
  {value:"YOBE", name:"YOBE"},
  {value:"ZAMFARA", name:"ZAMFARA"},

]

noAuthHeader = {headers: new HttpHeaders({NoAuth: 'True'})};
AuthHeader = {headers: new HttpHeaders().set('Authorization',
`Bearer ${localStorage.getItem('token')}`)};


  constructor(private http: HttpClient, 
              public alertController: AlertController,
              public toastController: ToastController,
              public userService: UserServiceService,
              private router: Router) {
              
               }
 
              
    deleteExpense(id){
      return this.http.get(environment.apiBaseUrl + `/delete-expense${id}`);
    }
    submitStaff(form){
      return this.http.post(environment.apiBaseUrl +'/submit-staff', form);
    }

    updateStaff(staff){
      return this.http.put(environment.apiBaseUrl +'/update-stafe', staff);
    }

    changeStaffStatus(status){
      return this.http.put(environment.apiBaseUrl + '/change-staff-status', status);
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
     return this.http.post(environment.apiBaseUrl + '/this-month-penalty', date)
    
    }

    reloadPenalty(data){
     return this.http.post(environment.apiBaseUrl + '/this-month-penalty', data);

    }
    
    getRemovedStaff(){
     return this.http.get(environment.apiBaseUrl + '/removed-staffed');

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
