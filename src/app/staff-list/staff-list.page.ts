import { UserServiceService } from './../shared/user-service.service';
import { StaffService } from './../shared/staff.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-staff-list',
  templateUrl: './staff-list.page.html',
  styleUrls: ['./staff-list.page.scss'],
})
export class StaffListPage implements OnInit, OnDestroy {
showform = false;
showList = true;
staffList = [];
loading = false;
admin: any;

  constructor(private staffService: StaffService,
              public userService: UserServiceService,
              public alertController: AlertController) {
    
   }

  model = {
    fullname : '',
    phone : '',
    department : '',
    bank: '',
    bankName: '',
    address: '',
    accountNumber: '',
    booking: '',
    accountType: '',
    admin:''
  }


  ngOnInit() {
    this.admin = localStorage.getItem('appUser');
    this.model.admin = this.admin;
    this.getLimitStaff();
  }

  ngOnDestroy(){
    this.staffList = [];
  }

  async deleteStaff(id, fullname){
    const alert = await this.alertController.create({
      header: `delete ${fullname}`,
      message : `<p class="text-danger">staff cannot be recovered</p>`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'danger',
          handler: (blah) => {
            console.log('cancel amount input');
          }
        }, {
          text: 'Confirm',
          cssClass : 'danger',
          handler: () => {
            console.log(id);
            this.loading = true;
            this.staffService.deleteTaff(id).subscribe(
            res => {
              this.loading = false;
              this.userService.generalToast(res['msg']);
              this.getLimitStaff();
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

  async penalizeStaff(id, fullname){
    const alert = await this.alertController.create({
      header: `Penalize ${fullname}`,
      message : `<p class="text-danger"> penalize user</p>`,
      inputs: [
        {
          name: 'amount',
          type: 'number',
          placeholder: 'enter amount',
        },
      {
        name: 'reason',
        type: 'text',
        placeholder: 'enter offence',
      }],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'danger',
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
                id : id
            }
            console.log(body);
            this.staffService.penalizeStaff(body).subscribe(
            res => {
              this.loading = false;
              this.userService.generalToast(res['msg']);
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

 async salaryAdAlert(id, fullname){
    const alert = await this.alertController.create({
      header: `Salary Advance`,
      message : `<p> salary advance for <div class="font-weight-bold">${fullname}</div>  </p>`,
      inputs: [
        {
          name: 'amount',
          type: 'number',
          placeholder: 'enter amount',
        },
        {
          name: 'reason',
          type: 'text',
          placeholder: 'enter reason',
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'danger',
          handler: (blah) => {
            console.log('cancel amount input');
          }
        }, {
          text: 'Confirm',
          cssClass : 'danger',
          handler: (values) => {
            console.log(values);
            if (values.amount == ''){
              this.userService.generalToast("you did not enter amount!");
            }else{

            
            this.loading = true;
            let body = {
                values: values,
                admin : this.admin,
                id : id
            }
            console.log(body);
            this.staffService.salaryAdvance(body).subscribe(
            res => {
              this.loading = false;
              this.userService.generalToast(res['msg']);
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


  resetForm(){
    this.model = {
      fullname : '',
      phone : '',
      department : '',
      bank: '',
      bankName: '',
      address: '',
      accountNumber: '',
      booking: '',
      accountType: '',
      admin: this.admin
    }
  }

  accounttype(event){
    console.log(event);
    this.model.accountType = event;
    console.log(this.model.accountType);
  } 
  selectDepartment(event){
    console.log(event);
    this.model.department = event;
    console.log(this.model.department); 
  }

  selectFormEvent(car){
  }

  addStaff(){
this.showform = true;
this.showList = false;
  }

  cancelForm(){
    this.showform = false;
    this.showList = true;
  }

  submitStaff(form: NgForm){
    console.log(form.value);
    this.loading = true;
    this.staffService.submitStaff(this.model).subscribe(
      res => {
        this.loading = false;
        console.log(res);
        this.userService.generalToast(res['msg']);
        this.resetForm();
        this.showform = false;
        this.showList = true;
        this.getLimitStaff();
      },
      err => {
        this.loading = false;
        console.log(err);
        this.userService.generalToast(err.error.msg);

      }
    );
    
  }

  getLimitStaff(){
    console.log('getting the limit')
    this.loading = true;
    this.staffService.getLimitStaff().subscribe(
      res => {
        this.loading = false;
        console.log(res);
        this.staffList = res['staff'];
      },
      err => {
        this.loading = false;
        console.log(err);
      }
    ); 
  }

  selectCategory(cat){
    console.log(cat);
    this.loading = true;
    this.staffService.getStaffByDepartment(cat).subscribe(
      res => {
        console.log(res);
        this.loading = false;
        this.staffList = res['staff'];
      },
      err => {
        this.loading = false;
        console.log(err);
      }
    );
  }

}
