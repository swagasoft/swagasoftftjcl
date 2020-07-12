import { StaffService } from './../../shared/staff.service';
import { UserServiceService } from './../../shared/user-service.service';
import { PayModalComponent } from './../pay-modal/pay-modal.component';
import { PayrollService } from './../../shared/payroll.service';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { AlertController, ModalController, IonRefresher } from '@ionic/angular';
import { count } from 'rxjs/operators';
import { setTimeout } from 'timers';

@Component({
  selector: 'app-pay-roll',
  templateUrl: './pay-roll.component.html',
  styleUrls: ['./pay-roll.component.scss'],
})
export class PayRollComponent implements OnInit ,OnDestroy {
  @ViewChild('refresherRef', {static : false}) refresherRef: IonRefresher;
allStaff= [];
page = 4;
loading = true;
totalSalary = 0
totalStaff = 0;

  constructor(private payService: PayrollService,
              public modalController: ModalController,
              public staffService: StaffService,
              public userService : UserServiceService,
              public alertController: AlertController) { 
  
  }

  model = {
    search: '',
    department:''
  }

  ngOnInit() {
    const admin = 'ADMINISTRATOR';
    this.model.department = admin;
    this.selectStaffByDepartment(admin);
  }
  ngOnDestroy(){
    this.allStaff = [];
  }

  getPageSymbol(current: number) {
    return ['A', 'B', 'C', 'D', 'E', 'F', 'G'][current - 1];
  }

  selectDepartment(event){
    this.model.department = event;
  }


  
  selectCategory(department){
    console.log(department)
    this.model.department = department;
    this.totalSalary = 0;
    this.totalStaff = 0;
    this.loading = true; 
    this.totalStaff = 0;
    this.staffService.getStaffByDepartment(department).subscribe(
      res => {
        this.loading = false;
        this.allStaff = res['staff'];
        this.totalStaff = this.allStaff.length;
        this.allStaff.forEach((one)=>{
          this.totalSalary += one.AmountPaid;
          console.log(res);
        });
      },
      err => {
        console.log(err)
        this.loading = false;
      }
    );
  }

  async presentModal(id,fullname,salary,bonus,penalty,
       savings,salary_adv,give,AmountPaid) {
    const modal = await this.modalController.create({
      component: PayModalComponent,
      componentProps: {
        'id': id,
        'fullname': fullname,
        'salary': salary,
        'bonus': bonus,
        'penalty': penalty,
        'savings': savings,
        'salary_adv': salary_adv,
        'AmountPaid': AmountPaid
      }
     
    }
    
    );
    
    modal.onDidDismiss().then(()=> {
     this.selectCategory(this.model.department);
    //  this.selectStaffByDepartment(this.model.department);
    });
    return await modal.present();
  }

  notpaid(id, department){
    this.model.department = department;
    this.payService.notPaidStaff(id).subscribe(
      res => {
        this.selectCategory(this.model.department);
        this.userService.generalToastSh(res['msg']);
      },
      err => {
        this.userService.generalToastSh(err.error.msg);
      }
    );
  }

  undoRecord(event, id, department){
    console.log(department)
    this.model.department = department;
    this.loading = true;
    this.payService.setTofalse(id).subscribe(
      res => {
        this.loading = false;
        this.userService.generalToastSh(res['msg']);
        this.selectCategory(this.model.department);
      },
      err => {
        this.loading = false;
        this.userService.generalToastSh(err.error.msg);
      }
    );
  }


  processRecord(event, id, department){
    this.loading = true;
    this.model.department = department;
    this.payService.setToTrue(id).subscribe(
      res => {
        this.loading = false;
        this.userService.generalToastSh(res['msg']);
        this.selectCategory(this.model.department);
      },
      err => {
        this.loading = false;
        this.userService.generalToastSh(err.error.msg);
      }
    );
  }


  async resetPayroll(){
    const alert = await this.alertController.create({
      header: `RESET PAYROLL?`,
     message : `<div class="text-danger">This action will reset every staff record to defualt!.</div>`,
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
            this.payService.resetPayroll().subscribe(
            res => {
              this.loading = false;
              this.userService.generalToast(res['msg']);
              this.selectStaffByDepartment(this.model.department);
            },
            err => {
              this.loading = false;
              this.userService.generalToastSh(err.error.msg);
            }
          );
        }
          }
        
      ]
    });
    await alert.present();
  }


  // async moreRecord(id,fullname,salary,bonus,penalty,
  //   savings,advance_salary,AmountPaid){
  //   const alert = await this.alertController.create({
  //     header: `${fullname}`,
  //     inputs: [ {  name: 'salary',label:'salary', type: 'number',value: salary, placeholder: 'enter salary',
  //       },
  //     { name: 'penalty', type: 'number', id:'Ipenalty', placeholder: 'enter penalty',
  //     },
  //     { name: 'bonus',label:'bonus', type: 'number', id: 'Ibonus', placeholder: 'enter bonus',
  //     },
  //     { name: 'savings',label:'savings', type: 'number', id: 'Ibonus', placeholder: 'enter savings',
  //     },
  //     { name: 'salary_adv',label:'salary adv', type: 'number', value:advance_salary, placeholder: 'salary advance',
  //     },
  //     { name: 'amount_paid',label:'paying', type: 'number', placeholder: 'salary advance',
  //      value: penalty,
  //     }],
  //     message : `<p> ${penalty} </p>`,
  //     buttons: [
  //       {
  //         text: 'Cancel', role: 'cancel', cssClass: 'danger',
  //         handler: (blah) => {
  //           console.log('cancel amount input');
  //         }
  //       }, {
  //         text: 'Confirm',
  //         cssClass : 'danger',
  //         handler: (values) => {
  //           console.log(values);
  //           if (values.amount == '' || values.reason == ''){
  //             this.userService.generalToast("you did not enter amount/reasons");
  //           }else{
  //           this.loading = true;
  //           let body = {
  //               values: values,
  //               admin: this.admin,
  //               user_id: user_id,
  //               id : id
  //           }
  //           console.log(body);
  //           this.staffService.editSalaryAdvance(body).subscribe(
  //           res => {
  //             this.loading = false;
  //             this.userService.generalToastSh(res['msg']);
  //             this.getAll();
  //           },
  //           err => {
  //             this.loading = false;
  //             this.userService.generalToast(err.error.msg);
  //           }
  //         );
  //       }
  //         }
  //       }
  //     ]
  //   });
  //   await alert.present();
  // }

  searchName(){
    this.loading = true;
    this.payService.searchName(this.model).subscribe(
      res => {
        this.loading = false;
        this.allStaff = res['staff'];
      },
      err => {
        this.loading = false;
        this.userService.generalToastSh(err.error.msg);
      }
    )
  }


  getAllStaff(){
    this.loading = true;
    this.totalSalary = 0;
    this.totalStaff = 0;
    this.payService.getAllStaff().subscribe(
      res => {
        this.loading = false;
        this.allStaff = res['staff'];
        this.totalStaff = this.allStaff.length;

        this.allStaff.forEach((one)=>{
          this.totalSalary += one.AmountPaid;
        });
      },
      err => {
        this.loading = false;
      }
    );
  }

  
  selectStaffByDepartment(department){
    this.totalSalary = 0;
    this.totalStaff = 0;
    this.loading = true;
    this.staffService.getStaffByDepartment(department).subscribe(
      res => {
        console.log(res);
        this.loading = false;
        this.allStaff = res['staff'];
        this.totalStaff = this.allStaff.length;

        this.allStaff.forEach((one)=>{
          this.totalSalary += one.AmountPaid;
        });
      },
      err => {
        this.loading = false;
        console.log(err);
      }
    );
  }
}
