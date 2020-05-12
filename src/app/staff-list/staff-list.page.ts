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
    admin:'',
    date: Date.now()
  }

  searchModel = { 
    search: '',fullname: '', month: null, year : null
    };


  ngOnInit() {
    this.admin = localStorage.getItem('appUser');
    this.model.admin = this.admin;
    const admin = 'ADMINISTRATOR'
    this.selectStaffByDepartment(admin);
  }

  ngOnDestroy(){
    this.staffList = [];
  }

  
  searchStaff(){
    console.log(this.searchModel.search);
    this.loading = true;
    this.staffService.searchStaff(this.searchModel).subscribe(
      res=> {
        this.loading = false;
        console.log(res);
        this.staffList = res['staff']; 
      },
      err=>{
        this.loading = false;
        this.staffList = [];
        this.userService.generalToastSh(err.error.msg);
        console.warn(err);
      }
    );
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

  async penalizeStaff(id, fullname,department){
    console.log('click')
    const alert = await this.alertController.create({
      header: `Penalize ${fullname}`,
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
                date: Date.now(),
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

 async salaryAdAlert(id, fullname, department){
   this.model.department = department;
   console.log(department);
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
                date:Date.now(),
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
      admin: this.admin,
      date: Date.now()
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

  selectFormEvent(event){
    console.log(event);
    this.model.department = event;
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
    this.staffService.getAllStaff().subscribe(
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

  selectStaffByDepartment(department){
    console.log(department);
    this.loading = true;
    this.staffService.getStaffByDepartment(department).subscribe(
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

  getAllStaff(department){
    console.log(department);
    this.loading = true;
    this.staffService.getAllStaff().subscribe(
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
