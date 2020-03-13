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

  constructor(private http: HttpClient) { }

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

  findBydate(date){
    return this.http.post(environment.apiBaseUrl + '/find-fruit-by-date', date);
  }

  getSomeData(date){
    return this.http.post(environment.apiBaseUrl + '/get-some-data', date);
  }
}


 