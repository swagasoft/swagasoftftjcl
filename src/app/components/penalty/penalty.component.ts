
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
 
  loading = true;
  admin: any;
  model;
  myDate  = new Date();
  penalize = [];

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
      setTimeout(()=> {
        this.getPenalty();
      },1000);
   
    } 
  
    getPenalty(){
      if(this.staffService.penaltySaver.length){
        this.penalize = this.staffService.penaltySaver;
        this.loading = false;
      }else{
        this.loading =true;
        this.staffService.thisMonthPenalty(this.searchModel).subscribe(
          res => {
            this.loading = false;
            this.penalize = res['record'];
            this.staffService.penaltySaver = this.penalize;
          },
          err => {
            this.loading = false;
            console.log(err)
            this.penalize = [];
            let message = (err.error.msg) ? err.error.msg : 'Internet connnection failed!';
            this.userService.generalToastSh(message);
          }
        );
      }
    
    }

    
    reloadPenalty(){
      this.loading = true;
      this.staffService.thisMonthPenalty(this.searchModel).subscribe(
        res => {
          this.loading = false;
          this.penalize = res['record'];
          this.refresherRef.complete();
          this.staffService.penaltySaver = this.penalize;
        },
        err => {
          this.loading = false;
          this.refresherRef.complete();
          console.log(err)
          this.penalize = [];
          let message = (err.error.msg) ? err.error.msg : 'Internet connnection failed!';
          this.userService.generalToastSh(message);
        }
      );
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
          this.loading = true;
          this.searchModel.month = event.month.value;
          this.searchModel.year = event.year.value;
          this.staffService.reloadPenalty(this.searchModel).subscribe(
          res => {
            this.loading = false;
            this.penalize = res['record'];
            this.staffService.penaltySaver = this.penalize;
          },
          err => {
            this.loading = false;
            console.log(err)
            this.penalize = [];
            this.userService.generalToastSh(err.error.msg);
          }
        );
        }
      }]
};

    findByDay(){
      this.loading = true;
      this.staffService.findPenaltyDate(this.model).subscribe(
        res => {
          this.loading = false;
          this.penalize = res['users'];
          this.staffService.penaltySaver = this.penalize;
        },
        err => {
          this.loading = false;
          console.log();
          this.penalize =[]; 
          this.userService.generalToastSh(err.error.msg);
        }
      );
    }
  
    doRefresh(event){ 
      this.reloadPenalty();
     
    }

    searchPenalty(){
      this.loading = true;
      this.staffService.searchPenalty(this.searchModel).subscribe(
        res=> {
          this.loading = false;
          this.penalize = res['users']; 
          this.staffService.penaltySaver = this.penalize;
        },
        err=>{
          this.loading = false;
          this.penalize = [];
          this.userService.generalToast(err.error.msg);
        }
      )
    }
  
    // getThisMonthPenalty() {
    //   this.staffService.thisMonthPenalty(this.searchModel);
    // }
  
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
              this.loading = true;
              let body = {
                  values: values,
                  admin: this.admin,
                  user_id: user_id,
                  id : id
              } 
              this.staffService.editPenalty(body).subscribe(
              res => {
                this.loading = false;
                this.userService.generalToastSh(res['msg']);
                this.reloadPenalty();
              },
              err => {
                this.loading = false;
                this.penalize = [];
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
              this.loading = true;
              this.staffService.wavePenalty(id).subscribe(
              res => {
                this.loading = false;
                this.userService.generalToastSh(res['msg']);
                this.reloadPenalty();
              },
              err => {
                this.loading = false;
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
                this.loading = false;
                this.userService.generalToastSh(res['msg']);
                this.reloadPenalty();
              },
              err => {
                this.loading = false;
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
      this.loading = true;
      this.staffService.verifyPenal(id).subscribe(
        res=> {
          this.loading = false;
          this.userService.generalToastSh(res['msg']);
          this.reloadPenalty();
        }
      );
    }

    unVerifyPenalty(id){
      this.loading = true;
      this.staffService.unVerifyPenal(id).subscribe(
        res=> {
          this.loading = false;
          this.userService.generalToastSh(res['msg']);
          this.reloadPenalty();
        }
      );
    }
    confirmPenalty(id){
      this.loading = true;
      this.staffService.confirmPenal(id).subscribe(
        res=> {
          this.loading = false;
          this.userService.generalToastSh(res['msg']);
          this.reloadPenalty();
        }
      );
    }

    unConfirmPenalty(id){
      this.loading = true;
      this.staffService.unConfirmPenal(id).subscribe(
        res=> {
          this.loading = false;
          this.userService.generalToastSh(res['msg']);
          this.reloadPenalty();
        }
      );
    }
  
}
