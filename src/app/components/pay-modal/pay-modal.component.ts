import { PayRollComponent } from './../pay-roll/pay-roll.component';
import { UserServiceService } from './../../shared/user-service.service';
import { StaffService } from './../../shared/staff.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NavParams, NavController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-pay-modal',
  templateUrl: './pay-modal.component.html',
  styleUrls: ['./pay-modal.component.scss'],
})
export class PayModalComponent implements OnInit {
  amountPaid: any;
  loading = false;
  salary: any;
  bonus: any;
  penalty: any;
  salary_adv: any;
  constructor(public navParams: NavParams,
              public staffService: StaffService,
              public userSErvice: UserServiceService,
              public navCtrl: NavController, public modalController: ModalController) {
    console.log('id', navParams.get('id'));
  console.log('fullname', navParams.get('fullname')); 
    console.log('salary', navParams.get('salary'));
    console.log('bonus', navParams.get('bonus'));
    console.log('salary_adv', navParams.get('salary_adv'));
    console.log('saving', navParams.get('savings'));
    console.log('penalty', navParams.get('penalty'));
    console.log('AmountPaid', navParams.get('AmountPaid'));
    console.log('AmountPaid', navParams.get('give'));
   }

  model = {
    id: '',
    fullname: '',
    salary: 0,
    bonus : 0,
    penalty: 0,
    savings: 0,
    give: 0,
    salary_adv: 0,
    amountPaid: 0
  }

  

  ngOnInit() {
    this.model.fullname = this.navParams.get('fullname');
    this.model.id = this.navParams.get('id');
    this.model.amountPaid =  this.navParams.get('AmountPaid');
    this.model.salary =  this.navParams.get('salary');
    this.model.salary_adv =  this.navParams.get('salary_adv');
    this.model.bonus =  this.navParams.get('bonus');
    this.model.penalty =  this.navParams.get('penalty');

  }

  closeModal(){
    this.modalController.dismiss();
  } 

  submitForm(form : NgForm){
    console.log(form.value);
    this.amountPaid = this.model.salary + this.model.bonus +
     this.model.give - this.model.salary_adv - this.model.penalty - this.model.savings;
    console.log(this.amountPaid);
    this.model.amountPaid = this.amountPaid;
    this.loading = true;
    this.staffService.settleSalary(this.model).subscribe(
    res=> {
      this.loading = false;
      console.log(res);
      this.userSErvice.generalToastSh(res['msg']);
      this.closeModal();
    },
    err => {
      this.loading = false;
      console.log(err);
      this.userSErvice.generalToastSh(err.error.msg);
    }
  );
    
  }
}
