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
salesRecord = [];
myDate = new Date();
fruitRecord = [];

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
    return this.http.post(environment.apiBaseUrl + '/find-fruit-by-date', date).subscribe(
      res => {
        this.loading = false;
        this.fruitRecord = res['record'];
      },
      err => {
        this.loading = false;
        this.fruitRecord =[];
        this.userService.generalToastSh(err.error.msg);
      }
    );
  }

  thisMonthFruit(month){ 
    if(this.fruitRecord.length == 0){
      return this.http.post(environment.apiBaseUrl + '/this-month-fruit', month).subscribe(
        res => {
          this.loading = false;
          console.log('this month',res);
          this.fruitRecord = res['record'];
        },
        err => {
          this.loading = false;
          console.log(err)
          this.fruitRecord = [];
          this.userService.generalToastSh(err.error.msg);
        }
      );
    }else{
      console.log('fruit already has records');
    }
  
  }

  reloadThisMonthFruit(month){ 
    return this.http.post(environment.apiBaseUrl + '/this-month-fruit', month).subscribe(
      res => {
        this.loading = false;
        console.log('this month',res);
        this.fruitRecord = res['record'];
      },
      err => {
        this.loading = false;
        console.log(err)
        this.fruitRecord = [];
        this.userService.generalToastSh(err.error.msg);
      }
    );
  }

  merchantSales(date){
    if(this.salesRecord.length == 0){
      this.loading = true;
      return this.http.post(environment.apiBaseUrl + '/merchant-sales', date).subscribe(
        res => {
          this.loading = false;
          console.log(res);
          this.loading = false;
          this.salesRecord = res['record'];
        },
       
        err => { 
          this.loading = false;
          console.log(err);
          this.salesRecord = [];
          this.userService.generalToast(err.error.msg);
        }
      );
    }else{
      console.log('MERCHANT ALREADY has datas');
    }
  }


  findmerchantByDay(ref){
    this.salesRecord = [];
    this.loading = true;
    this.http.post(environment.apiBaseUrl + '/merchant-date-day', ref).subscribe(
      res => {
        this.loading = false;
        this.salesRecord = res['record'];
      },
      err => { 
        this.loading = false;
        this.userService.generalToastSh(err.error.msg);
      }
    );
  }


  
  reloadMerchantSales(date){
    this.loading = true;
    return this.http.post(environment.apiBaseUrl + '/merchant-sales', date).subscribe(
      res => {
        this.loading = false;
        console.log(res);
        this.loading = false;
        this.salesRecord = res['record'];
      },
     
      err => { 
        console.log(err);
        this.loading = false;
        this.salesRecord = [];
        this.userService.generalToast(err.error.msg);
      }
    );
  }

}


 