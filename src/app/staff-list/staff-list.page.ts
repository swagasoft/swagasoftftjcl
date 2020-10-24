import { UserServiceService } from './../shared/user-service.service';
import { StaffService } from './../shared/staff.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { EditProductionComponent } from '../components/edit-production/edit-production.component';
import { EditStaffComponent } from '../components/edit-staff/edit-staff.component';

@Component({
  selector: 'app-staff-list',
  templateUrl: './staff-list.page.html',
  styleUrls: ['./staff-list.page.scss'],
})
export class StaffListPage implements OnInit, OnDestroy {
showform = false;
showList = true;
staffList = [];
loading = true;
admin: any; 
segment = null;
expand = false;
  constructor(public staffService: StaffService,
              public userService: UserServiceService,
              public modalController: ModalController,
              public alertController: AlertController) {
    
   }

  model = {
    fullname : '',
    phone : '',
    department : '',
    bank: '',
    bankName: '',
    location:'',
    startDate:'',
    address: '',
    accountNumber: '',
    booking: '',
    accountType: '',
    admin:'',
    date: Date.now()
  };

  searchModel = { 
    search: '',fullname: '', month: null, year : null
    };


    segmentChanged(event){
      this.segment = event.target.value;
    }

    expandPanel(event){
      console.log(event);
      this.expand = event.detail.checked;
    }

    changeStatus(event, id){
      console.log(event);
      console.log(id);
      let  status = {active: event.detail.checked, id: id};
      this.staffService.changeStaffStatus(status).subscribe(
        res => {
          console.log(res);
          this.selectStaffByDepartment(this.model.department);
        }
      );
    }

  ngOnInit() {
    this.admin = localStorage.getItem('appUser');
    this.model.admin = this.admin;
    const admin = 'ADMINISTRATOR';
    this.model.department = admin;
    setTimeout(()=> {
    this.selectStaffByDepartment(admin);
   },1000);
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
        this.staffService.staffSaver = this.staffList;
      },
      err=>{
        this.loading = false;
        this.staffList = [];
        this.userService.generalToastSh(err.error.msg);
        console.warn(err);
      }
    );
  }

  async editprompt(item){
    console.log(item);
    const alert = await this.alertController.create({
      header: `Edit ${item.fullname}`,
      message : `<p class="text-dark">modify staff properties</p>`,
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: (blah) => {
            console.log('cancel amount input');
          }
        }, {
          text: 'Yes',
          handler: () => {
            this.editStaff(item);
           
         
          }
        }
      ]
    });
    await alert.present();
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
              this.selectStaffByDepartment(this.model.department);
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

  async editStaff(staff) {
    console.log();
    const modal = await this.modalController.create({
  component: EditStaffComponent,
  componentProps: {
    'id': staff._id,
    'fullname':  staff.fullname,
    'phone': staff.phone,
    'department': staff.department,
    'bankNumber': staff.bankNumber,
    'bankAccountType': staff.bankAccountType,
    'bankName': staff.bankName,
    'startDate': staff.startDate,
    'bankAccountName': staff.bankAccountName,
    'location': staff.location,
    'address':staff.address,
    'accountNumber':staff.accountNumber,
  }} );
    modal.onDidDismiss().then(() => {
         this.selectStaffByDepartment(this.model.department);
});
    return await modal.present();
}

  async penalizeStaff(id, fullname,department){
    console.log('click');
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
            };
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
            };
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
      location:'',
      startDate:'',
      bank: '',
      bankName: '',
      address: '',
      accountNumber: '',
      booking: '',
      accountType: '',
      admin: this.admin,
      date: Date.now()
    };
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

  selectLocation(event){
    console.log(this.model.location);
    // console.log(event)
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
    this.loading = true;
    this.staffService.submitStaff(this.model).subscribe(
      res => {
        this.loading = false;
        console.log(res);
        this.userService.generalToast(res['msg']);
        this.resetForm();
        this.showform = false;
        this.showList = true;
        this.selectStaffByDepartment(this.model.department);
      },
      err => {
        this.loading = false;
        console.log(err);
        this.userService.generalToast(err.error.msg);

      }
    );
    
  }

  getLimitStaff(){
    console.log('getting the limit');
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
        // this.staffService.staffSaver = this.staffList;
      },
      err => {
        this.loading = false;
        console.log(err);
      }
    );
  }

  

  getAllStaff(){
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

  removedStaff(){
    this.loading = true;
    this.staffService.getRemovedStaff().subscribe(
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
