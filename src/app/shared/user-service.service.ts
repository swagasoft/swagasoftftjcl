import { environment } from 'src/environments/environment';
// import { Observable, observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { AlertController, ToastController, Platform } from '@ionic/angular';
import { Observable } from 'rxjs';
// import { Network } from '@ionic-native/network';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  messsageFromServer : any;
  token: any;
  accountBalance: any;
  username: any;
  networkDisconnet = false;


  noAuthHeader = {headers: new HttpHeaders({NoAuth: 'True'})};
AuthHeader = {headers: new HttpHeaders().set('Authorization',
`Bearer ${localStorage.getItem('token')}`)};

  constructor(private http: HttpClient, 
              public alertController: AlertController,
              public toastController: ToastController,
              private platform: Platform,
              private router: Router) {

      
     }

     login(credentials) {
      return this.http.post(environment.apiBaseUrl  + '/login',
       credentials, this.noAuthHeader);
    }

    createUser(user_info){
      return  this.http.post(environment.apiBaseUrl + `/create-user`, user_info);
    }

    updateBalance(amount){
      return this.http.post(environment.apiBaseUrl + '/update-balance', amount);
    }

    submitExpense(list){
      return this.http.post(environment.apiBaseUrl + '/submit-expense', list);
    }

    getExpenses(){
      return this.http.get(environment.apiBaseUrl + '/get-expenses');
    }

    getCredit(){
      return this.http.get(environment.apiBaseUrl + '/get-credit');
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

    reverseExpense(data){
      return this.http.post(environment.apiBaseUrl + `/reverse-expense`, data);
    }
    searchExpense(search){
      return this.http.post(environment.apiBaseUrl + '/search-expense',search);
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
      console.log(id)
      return this.http.get(environment.apiBaseUrl + `/delete-user${id}`);
    }

     getUserRole(){
      return localStorage.getItem('user-role');
     }


    public getToken(): string {
      this.token = localStorage.getItem('token');
      return this.token;
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
      window.localStorage.removeItem('token');
    }

     public logout(): void {
      this.deleteToken();
      this.token = '';
      this.username = '';
      this.accountBalance = '';
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
      
    }  async generalToastSh(message) {
      const toast = await this.toastController.create({
        header: 'Info ',
        message: `${message}`,
        position: 'middle',
        duration: 1000
      });
      toast.present();
    }
}
