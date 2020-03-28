import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserServiceService } from 'src/app/shared/user-service.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-exp-return-modal',
  templateUrl: './exp-return-modal.component.html',
  styleUrls: ['./exp-return-modal.component.scss'],
})
export class ExpReturnModalComponent implements OnInit {
loading = false;
  constructor(public userService: UserServiceService,  public modalController: ModalController) { 
    this.expenseModel.admin = localStorage.getItem('appUser');
  }


  expenseModel = {
    date : Date.now(),
    description : '',
    product : '',
    amountPaid : null,
    receiver : '', 
    admin : localStorage.getItem('appUser'),
    information : '',
    verified : false
    };


  ngOnInit() {}

  closeModal(){
    this.modalController.dismiss();
  } 


  submitExpense(form: NgForm) {
    this.loading = true;
    console.log(this.expenseModel);
    this.userService.expenseReturn(this.expenseModel).subscribe(
      res => {
        this.loading = false;
        this.userService.generalToastSh(res['msg'])
        this.closeModal();
       
      },
      err => {
        this.loading = false;
        this.userService.generalToastSh(err.error.msg);
        console.log(err);
      }
    );
  }

}
