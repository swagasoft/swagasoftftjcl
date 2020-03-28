import { NgForm } from '@angular/forms';
import { UserServiceService } from './../../shared/user-service.service';
import { StaffService } from './../../shared/staff.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonRefresher, AlertController } from '@ionic/angular';
import { NgbDatepickerNavigateEvent } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-salary-adv',
  templateUrl: './salary-adv.component.html',
  styleUrls: ['./salary-adv.component.scss'],
})
export class SalaryAdvComponent implements OnInit {
  @ViewChild('refresherRef', {static : false}) refresherRef: IonRefresher; 
allAdvance = [];
loading  = false;
model;
admin: any; 
 
searchModel = { 
  search: '',
 fullname: '',
 month: null,
    year : null
  };

  constructor(private staffService: StaffService, public alertController: AlertController,
     public userService: UserServiceService) { }

  ngOnInit() {
    this.getAll();
    this.admin = localStorage.getItem('appUser');
  }
  show = true;

 
  submitDate(form: NgForm){
    console.log(form.value);
    console.log(this.model);
    this.findBydate();
  }

  doRefresh(event){
    this.loading = true;
    this.getAll();
      this.loading = false;
  }

  thisMonthRecord($event: NgbDatepickerNavigateEvent) {
    this.searchModel.month = $event.next.month;
    this.searchModel.year = $event.next.year;
    console.log(this.searchModel);
    this.staffService.thismonthRecord(this.searchModel).subscribe(
      res => {
        console.log(res);
        this.allAdvance = res['record'];
      },
      err => {
        console.log(err);
        this.allAdvance = [];
        this.userService.generalToastSh(err.error.msg);
      } 
    );
  }


  selectedVal(event){
    this.searchModel.fullname = event.detail.value;
    console.log(event);
    console.log(this.searchModel);

  }


  searchRecord(){
    console.log(this.searchModel.search);
    this.loading = true;
    this.staffService.searchAdvsalary(this.searchModel).subscribe(
      res => {
        this.loading = false;
        console.log(res);
        this.allAdvance = res['users']; 
      },
      err => {
        this.loading = false;
        this.allAdvance = [];
        console.warn(err);
      }
    );
  }

  getAll(){
    this.loading = true;
    this.staffService.getAllSalaryAdvance().subscribe(
        res => {
          console.log(res);
          this.loading = false;
          this.allAdvance = res['users']; 
          this.refresherRef.complete();
        },
        err => {
          console.warn(err);
          this.loading = false;
          this.allAdvance = []; 
          this.refresherRef.complete();
          this.userService.generalToastSh(err.error.msg);
        }
      );
  }

  async deleteRecord(id, user_id, amount, reason){
    const alert = await this.alertController.create({
      header: `DELETE THIS RECORD?`,
    
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
           
            this.loading = true;
            let body = {
                values: values,
                admin: this.admin,
                user_id: user_id,
                id : id
            }
            console.log(body);
            this.staffService.deleteSalaryAdvance(body).subscribe(
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

  findBydate(){
    this.loading = true;
    this.staffService.findSalaryAdvbyDate(this.model).subscribe(
      res => {
        this.loading = false;
        this.allAdvance = res['users']; 
        console.log(res);
      },
      err => {
        this.loading = false;
        this.allAdvance = []; 
        console.log();
        this.userService.generalToastSh(err.error.msg);
      }
    );
  }
}

