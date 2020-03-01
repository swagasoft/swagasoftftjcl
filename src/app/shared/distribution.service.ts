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
}
