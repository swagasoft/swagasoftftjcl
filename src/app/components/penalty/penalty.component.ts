
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { IonRefresher, AlertController } from '@ionic/angular';
import { StaffService } from 'src/app/shared/staff.service';
import { UserServiceService } from 'src/app/shared/user-service.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-penalty',
  templateUrl: './penalty.component.html',
  styleUrls: ['./penalty.component.scss'],
})
export class PenaltyComponent implements OnInit{
  @ViewChild('refresherRef', {static : false}) refresherRef: IonRefresher;
 
  loading = false;
  admin: any;
  model;
  myDate  = new Date();

searchModel = { 
  search: '',fullname: '', month: null, year : null
  };


    constructor(public staffService: StaffService,public alertController: AlertController,
                public userService: UserServiceService) {
                  let appMonth = new Date().getMonth() + 1;
                  let appYear = new Date().getFullYear() ;
                  this.searchModel.month = appMonth;
                  this.searchModel.year = appYear;
     }
  
    ngOnInit() {
      this.admin = localStorage.getItem('appUser');
      console.log(this.userService.role);
      this.staffService.thisMonthPenalty(this.searchModel);
    } 
  
   

    submitDate(form: NgForm){
      console.log(form.value);
      console.log(this.model);
      this.findByDay();
    }


    // tslint:disable-next-line: member-ordering
    filter_Month_Year: any = {
      buttons: [{
        text: 'CANCEL',
        handler: (event) => console.log('calender cancelled')
      }, {
        text: 'SEARCH',
        handler: (event) => {
        console.log('clicked search..',event)
        console.log(event.month.value);
        this.searchModel.month = event.month.value;
        this.searchModel.year = event.year.value;
        this.staffService.thisMonthPenalty(this.searchModel);
        }
      }]
};

    findByDay(){
      this.staffService.loading = true;
      this.staffService.findPenaltyDate(this.model).subscribe(
        res => {
          this.staffService.loading = false;
          this.staffService.penalize = res['users']; 
          console.log(res);
        },
        err => {
          this.staffService.loading = false;
          console.log();
          this.staffService.penalize =[]; 
          this.userService.generalToastSh(err.error.msg);
        }
      );
    }
  
    doRefresh(event){
      this.staffService.thisMonthPenalty(this.searchModel);
      setTimeout(()=> {
        this.refresherRef.complete();
      },1000);
     
    }

    searchPenalty(){
      console.log(this.searchModel.search);
      this.staffService.loading = true;
      this.staffService.searchPenalty(this.searchModel).subscribe(
        res=> {
          this.staffService.loading = false;
          console.log(res);
          this.staffService.penalize = res['users']; 
        },
        err=>{
          this.staffService.loading = false;
          this.staffService.penalize = [];
          console.warn(err);
        }
      )
    }
  
    getThisMonthPenalty() {
      this.staffService.thisMonthPenalty(this.searchModel);
    }
  
    async editRecord(id,user_id,amount, reason){
      const alert = await this.alertController.create({
        header: `EDIT THIS RECORD?`,
        inputs: [ {  name: 'amount', type: 'number',value: amount, placeholder: 'enter amount',
          },
        { name: 'reason', type: 'text', value: reason, placeholder: 'enter offence',
        }],
        buttons: [
          {
            text: 'Cancel', role: 'cancel', cssClass: 'danger',
            handler: (blah) => {
              console.log('cancel amount input');
            }
          }, {
            text: 'Confirm',
            cssClass : 'danger',
            handler: (values) => {
              console.log(values);
              if (values.amount == '' || values.reason == ''){
                this.userService.generalToast("you did not enter amount/reasons");
              }else{
              this.staffService.loading = true;
              let body = {
                  values: values,
                  admin: this.admin,
                  user_id: user_id,
                  id : id
              } 
              console.log(body);
              this.staffService.editPenalty(body).subscribe(
              res => {
                this.staffService.loading = false;
                this.userService.generalToastSh(res['msg']);
                this.staffService.reloadPenalty(this.searchModel);
              },
              err => {
                this.staffService.loading = false;
                this.userService.generalToast(err.error.msg);
              }
            );
          }
            }
          }
        ]
      });
      await alert.present();
    }


    async waveRecord(id){
      const alert = await this.alertController.create({
        header: `WAVE PENALTY?`,
       
        buttons: [
          {
            text: 'Cancel', role: 'cancel', cssClass: 'danger',
            handler: (blah) => {
              console.log('cancel amount input');
            }
          }, {
            text: 'Confirm',
            cssClass : 'danger',
            handler: (values) => {
              console.log(id);
              this.staffService.wavePenalty(id).subscribe(
              res => {
                this.userService.generalToastSh(res['msg']);
                this.staffService.reloadPenalty(this.searchModel);
              },
              err => {
                this.userService.generalToast(err.error.msg);
              }
            );
          }
            }
          
        ]
      });
      await alert.present();
    }

    async deleteRecord(id){
      const alert = await this.alertController.create({
        header: `DELETE PENALTY?`,
       
        buttons: [
          {
            text: 'Cancel', role: 'cancel', cssClass: 'danger',
            handler: (blah) => {
              console.log('cancel amount input');
            }
          }, {
            text: 'Confirm',
            cssClass : 'danger',
            handler: (values) => {
              console.log(id);
              this.loading = true;
              this.staffService.deletePenalty(id).subscribe(
              res => {
                this.staffService.loading = false;
                this.userService.generalToastSh(res['msg']);
                this.staffService.reloadPenalty(this.searchModel);
              },
              err => {
                this.staffService.loading = false;
                this.userService.generalToast(err.error.msg);
              }
            );
          }
            }
          
        ]
      });
      await alert.present();
    }

    //  thisMonthRecord(event){
     
    //    this.searchModel.month = event.next.month;
    //    this.searchModel.year = event.next.year;
    //    console.log(this.searchModel);
    //    this.staffService.thisMonthPenalty(this.searchModel).subscribe(
    //      res => {
    //        console.log('this month',res);
    //        this.penalize = res['record'];
    //      },
    //      err => {
    //        console.log(err)
    //        this.penalize = [];
    //        this.userService.generalToastSh(err.error.msg);
    //      }
    //    );
    // }

    verifyPenalty(id){
      this.staffService.loading = true;
      this.staffService.verifyPenal(id).subscribe(
        res=> {
          this.staffService.loading = false;
          this.userService.generalToastSh(res['msg']);
          this.staffService.reloadPenalty(this.searchModel);
        }
      );
    }

    unVerifyPenalty(id){
      this.staffService.loading = true;
      this.staffService.unVerifyPenal(id).subscribe(
        res=> {
          this.staffService.loading = false;
          this.userService.generalToastSh(res['msg']);
          this.staffService.reloadPenalty(this.searchModel);
        }
      );
    }
    confirmPenalty(id){
      this.staffService.loading = true;
      this.staffService.confirmPenal(id).subscribe(
        res=> {
          this.staffService.loading = false;
          this.userService.generalToastSh(res['msg']);
          this.staffService.reloadPenalty(this.searchModel);
        }
      );
    }

    unConfirmPenalty(id){
      this.staffService.loading = true;
      this.staffService.unConfirmPenal(id).subscribe(
        res=> {
          this.staffService.loading = false;
          this.userService.generalToastSh(res['msg']);
          this.staffService.reloadPenalty(this.searchModel);
        }
      );
    }
  
}
