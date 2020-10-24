import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DistributionService {

  noAuthHeader = {headers: new HttpHeaders({NoAuth: 'True'})};
AuthHeader = {headers: new HttpHeaders().set('Authorization',
`Bearer ${localStorage.getItem('token')}`)};

  constructor(private http: HttpClient, 
              public alertController: AlertController) { }

  summitProduction(prod){
    return this.http.post(environment.apiBaseUrl + '/submit-prod', prod);
  }

  getProduction(){
    return this.http.get(environment.apiBaseUrl + '/get-production');
  }

  submitbadStock(badstock){
    return this.http.post(environment.apiBaseUrl + '/submit-bad-stock', badstock);
  }
  findOutlet(id){
    return this.http.get(environment.apiBaseUrl + `/find-outlet${id}`);
  }
  supplyOutlet(goods){
    return this.http.post(environment.apiBaseUrl + '/supply-outlet', goods);
  }

  closeRecord(id){
    return this.http.get(environment.apiBaseUrl + `/close-record${id}`);
  }

  submitReturns(returns){
    return this.http.post(environment.apiBaseUrl + '/submit-returns', returns);
  }
  editProduction(production){
    return this.http.post(environment.apiBaseUrl + '/edit-production',production);
  }

  confirmProd(id){
    return this.http.get(environment.apiBaseUrl + `/confirm-prod${id}`);
  }
  unConfirmProd(id){
    return this.http.get(environment.apiBaseUrl + `/un-confirm-prod${id}`);
  }

  getOutletSupplies(properties){
    return this.http.post(environment.apiBaseUrl + '/get-outlet-supplies', properties);
  }

  getOutletSuppliesByDay(properties){
    return this.http.post(environment.apiBaseUrl + '/get-outlet-supplies-daily', properties);
  }

  productionList(date){
    return this.http.post(environment.apiBaseUrl +'/production-list',date);
  }

  editBadStock(stock){
    return this.http.post(environment.apiBaseUrl + '/edit-bad-stock', stock);
  }

  confirmSupply(id){
    return this.http.get(environment.apiBaseUrl + `/confirm-supply${id}`);
  }

  unConfirmSupply(id){
    return this.http.get(environment.apiBaseUrl + `/un-confirm-supply${id}`);
  }
  verifySupply(id){
    return this.http.get(environment.apiBaseUrl + `/verify-supply${id}`);
  }
  unVerifySupply(id){
    return this.http.get(environment.apiBaseUrl + `/un-verify-supply${id}`);
  }

  updateSupply(supply){
    return this.http.post(environment.apiBaseUrl + '/update-supply',supply);
  }

  getProdByDate(date){
    return this.http.post(environment.apiBaseUrl + '/prod-by-date', date);
  }
}
