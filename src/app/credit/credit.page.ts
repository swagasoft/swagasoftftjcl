import { UserServiceService } from './../shared/user-service.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonRefresher } from '@ionic/angular';

@Component({
  selector: 'app-credit',
  templateUrl: './credit.page.html',
  styleUrls: ['./credit.page.scss'],
})
export class CreditPage implements OnInit {
  @ViewChild('refresherRef', {static : false}) refresherRef: IonRefresher; 
loading = false;
myDate  = new Date();
totalCredit = 0;

  constructor(public userService: UserServiceService) {
    let appDay = new Date().getDate();
    this.searchModel.month =  new Date().getMonth() + 1;
    this.searchModel.year = new Date().getFullYear() ;
   }

credit = [];
  ngOnInit() {
    this.getCredit();
  }

  searchModel = { 
    search: '', fullname: '', day: null, month: null, year : null
    };

  doRefresh(event){
    this.loading = true;
    this.getCredit();
    this.loading = false;
    setTimeout(()=> {
        this.refresherRef.complete();
      },1000);
  }

  getCredit(){
    this.credit = [];
    this.totalCredit = 0;
    this.loading = true;
    this.userService.getCredit(this.searchModel).subscribe(
      res => {
        this.loading = false;
        this.credit = res['credits'];
        console.log(this.credit);
        this.credit.forEach((doc)=> {
          this.totalCredit += doc.balance;
        });
        this.refresherRef.complete();
      },
      err => {
        this.loading = false;
        this.credit = [];
        console.log(err);
        this.refresherRef.complete();
        this.userService.generalToast(err.error['msg']);
      }
    );
  }

  delete(id){
    console.log(id);
    this.loading = true;
    this.userService.deleteCredit(id).subscribe(
      res => {
        this.userService.generalToast(res['msg']);
        this.getCredit();
      },
      err => {
        this.userService.generalToast(err.error.msg);
      }
    );
  }


  //  Ccustom date picker
      // tslint:disable-next-line: member-ordering
      filter_Month_Year: any = {
        buttons: [{
          text: 'CANCEL',
          handler: (event) => console.log('calender cancelled')
        }, {
          text: 'SEARCH',
          handler: (event) => {
           this.searchModel.month = event.month.value;
           this.searchModel.year = event.year.value;
           this.getCredit();
          }
        }]
      };

}
