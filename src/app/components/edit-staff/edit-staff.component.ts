import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { StaffService } from 'src/app/shared/staff.service';
import { NgForm } from '@angular/forms';
import { UserServiceService } from 'src/app/shared/user-service.service';

@Component({
  selector: 'app-edit-staff',
  templateUrl: './edit-staff.component.html',
  styleUrls: ['./edit-staff.component.scss'],
})
export class EditStaffComponent implements OnInit {
loading = false;
  constructor(public modalController: ModalController, public navParams: NavParams,
    private userService: UserServiceService,
    public staffService: StaffService) { 
    this.model.id = this.navParams.get('id');
    this.model.fullname = this.navParams.get('fullname');
    this.model.phone = this.navParams.get('phone');
    this.model.department = this.navParams.get('department');
    this.model.bankName = this.navParams.get('bankName');
    this.model.bankNumber = this.navParams.get('bankNumber');
    this.model.bankAccountType = this.navParams.get('bankAccountType');
    this.model.location = this.navParams.get('location');
    this.model.bankAccountName = this.navParams.get('bankAccountName');
    this.model.address = this.navParams.get('address');
    this.model.startDate = this.navParams.get('startDate');
    console.log(this.model);
  }

  model = {
    id:'',
    fullname : '',
    phone : '',
    department: '',
    bankName: '',
    bankNumber: '',
    bankAccountType: '',
    bankAccountName: '',
    location:'',
    startDate:'',
    address: '',
    admin: localStorage.getItem('appUser'),
    date: Date.now()
  }

  ngOnInit() {}

  closeModal(){
    this.modalController.dismiss();
  }


  selectLocation(event){
    console.log(this.model.location)
    // console.log(event)
  }

  accounttype(event){
    console.log(event);
    this.model.bankAccountType = event;
  } 


  updateStaff(form: NgForm){
    this.loading = true;
    console.log(this.model)
    this.staffService.updateStaff(this.model).subscribe(
      res => {
        this.loading = false;
        console.log(res);
        this.userService.generalToast(res['msg']);
        this.closeModal();
       
      },
      err => {
        this.loading = false;
        console.log(err);
        this.userService.generalToast(err.error.msg);

      }
    );
    
  }

}
