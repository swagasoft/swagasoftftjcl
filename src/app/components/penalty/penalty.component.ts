
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
export class PenaltyComponent implements OnInit, OnDestroy {
  @ViewChild('refresherRef', {static : false}) refresherRef: IonRefresher;
  penalize = [];
  loading = false;
  admin: any;
  model;

searchModel = { 
  search: '',fullname: '', month: null, year : null
  };


    constructor(private staffService: StaffService,public alertController: AlertController,
                public userService: UserServiceService) {
     }
  
    ngOnInit() {
      this.admin = localStorage.getItem('appUser');
      console.log(this.userService.role);
    }
  
    ngOnDestroy(){
      this.penalize = [];
    }

    submitDate(form: NgForm){
      console.log(form.value);
      console.log(this.model);
      this.findBydate();
    }

    findBydate(){
      this.loading = true;
      this.staffService.findPenaltyDate(this.model).subscribe(
        res => {
          this.loading = false;
          this.penalize = res['users']; 
          console.log(res);
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
      this.loading = true;
      this.getAll();
      this.loading = false;
    }

    searchPenalty(){
      console.log(this.searchModel.search);
      this.loading = true;
      this.staffService.searchPenalty(this.searchModel).subscribe(
        res=> {
          this.loading = false;
          console.log(res);
          this.penalize = res['users']; 
        },
        err=>{
          this.loading = false;
          this.penalize = [];
          console.warn(err);
        }
      )
    }
  
    getAll() {
      this.loading = true;
      this.staffService.getAllPenalty().subscribe(
        res => {
          this.loading = false;
          console.log(res);
          this.penalize = res['users'];
          this.refresherRef.complete();
        },
        err => {
          this.loading = false;
          this.refresherRef.complete();
          this.userService.generalToastSh(err.error.msg);
          
          console.log(err);
  
        }
      );
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
              this.loading = true;
              let body = {
                  values: values,
                  admin: this.admin,
                  user_id: user_id,
                  id : id
              } 
              console.log(body);
              this.staffService.editPenalty(body).subscribe(
              res => {
                this.loading = false;
                this.userService.generalToastSh(res['msg']);
                this.getAll();
              },
              err => {
                this.loading = false;
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
              this.loading = true;
              this.staffService.wavePenalty(id).subscribe(
              res => {
                this.loading = false;
                this.userService.generalToastSh(res['msg']);
                this.getAll();
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
                this.getAll();
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

     thisMonthRecord(event){
       let month = event.next.month;
       let year = event.next.year;
       this.searchModel.month = event.next.month;
       this.searchModel.year = event.next.year;
       console.log(this.searchModel);
       this.staffService.thisMonthPenalty(this.searchModel).subscribe(
         res => {
           console.log('this month',res);
           this.penalize = res['record'];
         },
         err => {
           console.log(err)
           this.penalize = [];
           this.userService.generalToastSh(err.error.msg);
         }
       );
    }
  
}
