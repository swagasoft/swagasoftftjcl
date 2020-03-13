import { StaffService } from './../../shared/staff.service';
import { UserServiceService } from './../../shared/user-service.service';
import { PayModalComponent } from './../pay-modal/pay-modal.component';
import { PayrollService } from './../../shared/payroll.service';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { AlertController, ModalController, IonRefresher } from '@ionic/angular';
import { count } from 'rxjs/operators';

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
    this.getAllStaff();
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

  doRefresh(event){
    this.loading = true;
    this.getAllStaff();
    this.loading = false;
  }

  
  selectCategory(cat){
    this.totalSalary = 0;
    this.totalStaff = 0;
    this.loading = true; 
    this.totalStaff = 0;
    this.staffService.getStaffByDepartment(cat).subscribe(
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

  async presentModal(id,fullname,salary,bonus,penalty,
       savings,salary_adv,AmountPaid) {
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
      this.getAllStaff();
    });
    return await modal.present();
  }

  notpaid(id){
    this.payService.notPaidStaff(id).subscribe(
      res => {
        this.getAllStaff();
        this.userService.generalToastSh(res['msg']);
      },
      err => {
        this.userService.generalToastSh(err.error.msg);
      }
    );
  }

  undoRecord(event, id){
    // settled: false
    this.loading = true;
    this.payService.setTofalse(id).subscribe(
      res => {
        this.loading = false;
        this.userService.generalToastSh(res['msg']);
        this.getAllStaff();
      },
      err => {
        this.loading = false;
        this.userService.generalToastSh(err.error.msg);
      }
    );
  }


  processRecord(event, id){
    this.loading = true;
    this.payService.setToTrue(id).subscribe(
      res => {
        this.loading = false;
        this.userService.generalToastSh(res['msg']);
        this.getAllStaff();
      },
      err => {
        this.loading = false;
        this.userService.generalToastSh(err.error.msg);
      }
    );
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
        this.refresherRef.complete();
        this.totalStaff = this.allStaff.length;

        this.allStaff.forEach((one)=>{
          this.totalSalary += one.AmountPaid;
        });
      },
      err => {
        this.loading = false;
        this.refresherRef.complete();
      }
    );
  }
}
