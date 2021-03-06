import { environment } from 'src/environments/environment';
// import { Observable, observable } from 'rxjs';
import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { AlertController, ToastController, Platform } from '@ionic/angular';
import { Observable } from 'rxjs';
import jwtDecode, * as jwt_decode from "jwt-decode";
// import { Network } from '@ionic-native/network';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  messsageFromServer : any;
  public appUser: any; 
  public role: any;
  username: any;
  networkDisconnet = false;
  loadingExpense = false;
  expense: Array<any> = [];
  expenseSaver = [];
 


  noAuthHeader = {headers: new HttpHeaders({NoAuth: 'True'})};
AuthHeader = {headers: new HttpHeaders().set('Authorization',
`Bearer ${localStorage.getItem('token')}`)};

  constructor(private http: HttpClient,  public alertController: AlertController,
              public toastController: ToastController,  private platform: Platform,
              private router: Router) {
      
            
              
             
     }

    

     refreshDetails(){
    this.appUser =   localStorage.getItem('appUser');
     
    this.role =   localStorage.getItem('user-role');
     }

     login(credentials) {
      return this.http.post(environment.apiBaseUrl  + '/login',
       credentials, this.noAuthHeader);
    }

    createUser(user_info){
      return  this.http.post(environment.apiBaseUrl + `/create-user`, user_info);
    }

    getUserDetails(){
      return this.http.get(environment.apiBaseUrl + '/get-user-details');
    }

    resetPassword(password){
      return this.http.post(environment.apiBaseUrl + '/change-password', password);
    }
     getExpenseTwo(date){
      return this.http.post(environment.apiBaseUrl + '/get-expense-two', date);
    }

    getExpense2ByDate(date){
      return this.http.post(environment.apiBaseUrl + '/expense-two-by-date', date);
    }

    submitExpense2(expense){
      return this.http.post(environment.apiBaseUrl + '/submit-expense-two', expense);
    }

    updateBalance(amount){
      return this.http.post(environment.apiBaseUrl + '/update-balance', amount);
    }

    getLastCredit(){
      return this.http.get(environment.apiBaseUrl + '/last-credit');
    }

    submitExpense(list){
      return this.http.post(environment.apiBaseUrl + '/submit-expense', list);
    }
    confirmExpense(id){
      return this.http.get(environment.apiBaseUrl +`/confirm-expense${id}`);
    }
    unConfirmExpense(id){
      return this.http.get(environment.apiBaseUrl +`/un-confirm-expense${id}`);
    }

    getExpenses(){
      return this.http.get(environment.apiBaseUrl + '/get-expenses');
    }

    thisMonthExpense(model){
       return this.http.post(environment.apiBaseUrl + '/this-month-expense', model)
    
    }

    // thisMonthExpenseAsync(model){
    //   console.log('search from service');
     
    //     this.loadingExpense = true;
    //     this.http.post(environment.apiBaseUrl + '/this-month-expense', model).pipe(
    //       map(res => {
    //         console.log(res['record']);
    //       }),
    //       sharedReplay()
    //     )
    // }

    reloadExpense(model){
      this.http.post(environment.apiBaseUrl + '/this-month-expense', model).subscribe(
        res => {
          this.loadingExpense = false;
          this.expense = res['record'];
        },
        err => {
          this.loadingExpense = false;
          console.log(err);
          this.expense = [];
          this.generalToastSh(err.error.msg);
        }
       );
    }

    findExpenseByDate(date){
      this.loadingExpense = true;
     return this.http.post(environment.apiBaseUrl + '/find-by-date', date)
    }

    updateExpense(expense){
      return this.http.put(environment.apiBaseUrl + '/update-expense', expense);
    }
    updateReturn(expense){
      return this.http.put(environment.apiBaseUrl + '/update-return', expense);
    }
    updateExpenseTwo(expense){
      return this.http.post(environment.apiBaseUrl + '/update-expense-two', expense);
    }

    expenseReturn(body){
      return this.http.post(environment.apiBaseUrl +`/return-expense`, body);
    }

    getCredit(date){
      return this.http.put(environment.apiBaseUrl + '/get-credit', date);
    }

    getBalance(): Observable<Object> {
      return this.http.get(environment.apiBaseUrl + '/get-balance');
    }

    selectExpenseByCategory(category){
      return this.http.get(environment.apiBaseUrl + `/select-expense${category}`);
    }

    getAllUsers(){
      return this.http.get(environment.apiBaseUrl + '/get-all-users');
    }
    verifyExpense(id){
      return this.http.get(environment.apiBaseUrl + `/verify-expense${id}`)
    }
    updatePenaltyRemark(penalty){
      return this.http.put(environment.apiBaseUrl + `/update-penalty-remark`,penalty);
    }

    reverseExpense(data){
      return this.http.post(environment.apiBaseUrl + `/reverse-expense`, data);
    }
    searchExpense(search){
    return this.http.post(environment.apiBaseUrl + '/search-expense',search)

    }

    deleteCredit(id){
      return this.http.get(environment.apiBaseUrl + `/delete-credit${id}`);
    }

    disableUser(id){
      return this.http.get(environment.apiBaseUrl + `/disable-user${id}`);
    }

    activateUser(id){
      return this.http.get(environment.apiBaseUrl + `/activate-user${id}`);
    }

    searchUser(username){
      return this.http.post(environment.apiBaseUrl + '/search-username', username);
    }

    deleteUser(id){
      return this.http.get(environment.apiBaseUrl + `/delete-user${id}`);
    }

    //  getUserRole(){
    //   return localStorage.getItem('user-role');
    //  }


  //  public  getUsername() {
  //     let payLoad =  jwtDecode(this.getToken());
  //     let email = payLoad['username'];
  //     return email;
  //    }
   

   public  getUsername() {
return localStorage.getItem('appUser')
     }
   

    // public  getUserRole() : string{
    //   let payLoad = jwtDecode(this.getToken());
    //   let role = payLoad['role'];
    //   // console.log(role);
    //   return role;
    //  }


    getUserRole(){
      return localStorage.getItem('user-role');
     }


    public getToken(): string {
      const token = localStorage.getItem('token');
      return token;
      }

    getUserPayload() {
      const token = this.getToken();
      if (token) {
        const userPayload = atob(token.split('.')[1]);
        return JSON.parse(userPayload);
      } else {
        return null;      
      }
    }
    
    isLogedIn() {
      const userPayload = this.getUserPayload();
      if (userPayload) {
      return userPayload.exp > Date.now() / 1000;
      } else {
      return false;
      }
    }

     setToken(token: string) {
      localStorage.setItem('token', token);
     }



     deleteToken() {
       localStorage.removeItem('user-role');
       window.localStorage.removeItem('token');
    }

     public logout(): void {
      this.deleteToken();
      this.username = '';
      localStorage.removeItem('appUser');
      this.router.navigateByUrl('/login');
     }

     loadBalance(){
      return this.http.get(environment.apiBaseUrl + '/load-balance');
    }

    async generalToast(message) {
      const toast = await this.toastController.create({
        header: 'Info ',
        message: `${message}`,
        position: 'middle',
        duration: 3000
      });
      toast.present();
      
    }
      async generalToastSh(message) {
      const toast = await this.toastController.create({
        header: 'Info ',
        message: `${message}`,
        position: 'middle',
        duration: 1000
      });
      toast.present();
    }

  
  
    }


