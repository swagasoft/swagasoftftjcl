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

  constructor(private staffService: StaffService,
              public userService: UserServiceService,
              public alertController: AlertController) {
    this.getAllStaff();
   }

  model = {
    fullname : '',
    phone : '',
    department : '',
    bank:'',
    bankName:'',
    address:'',
    accountNumber:'',
    booking:'',
    salary:null,
    accountType:''
  }


  ngOnInit() {
  }

  ngOnDestroy(){
    this.staffList = [];
  }

  async deleteStaff(id,fullname){
    const alert = await this.alertController.create({
      header: `delete ${fullname}`,
      message :`<p class="text-danger">staff cannot be recovered</p>`,
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

  async penalizeStaff(id,fullname){
    const alert = await this.alertController.create({
      header: `Penalize ${fullname}`,
      message :`<p class="text-danger"> amount will be deducted from users salary</p>`,
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
            this.loading = true;
            let body = {
                values: values,
                id :id
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
      ]
    });
    await alert.present();
  }

  resetForm(){
    this.model = {
      fullname : '',
      phone : '',
      department : '',
      bank:'',
      bankName:'',
      address:'',
      accountNumber:'',
      booking:'',
      salary:null,
      accountType:''
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

  addStaff(){
this.showform = true;
this.showList = false;
  }

  cancelForm(){
    this.showform = false;
    this.showList = true;
  }

  submitStaff(form:NgForm){
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
        this.getAllStaff();
      },
      err => {
        this.loading = false;
        console.log(err);
        this.userService.generalToast(err.error.msg);

      }
    );
    
  }

  getAllStaff(){
    this.loading = true;
    this.staffService.getAllStaff().subscribe(
      res=> {
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
