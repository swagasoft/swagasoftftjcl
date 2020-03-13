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
  constructor(public userService: UserServiceService) {
    this.getCredit();
   }

credit = [];
  ngOnInit() {
  }

  doRefresh(event){
    this.loading = true;
      this.getCredit();
      this.loading = false;
  }

  getCredit(){
    this.loading = true;
    this.userService.getCredit().subscribe(
      res => {
        this.loading = false;
        this.credit = res['credits'];
        console.log(this.credit);
        this.refresherRef.complete();
      },
      err => {
        this.loading = false;
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

}
