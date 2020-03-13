import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { UserServiceService } from 'src/app/shared/user-service.service';

@Component({
  selector: 'app-expense-edit',
  templateUrl: './expense-edit.component.html',
  styleUrls: ['./expense-edit.component.scss'],
})
export class ExpenseEditComponent implements OnInit {
loading = false;
  constructor(public navParams: NavParams,
              public userService: UserServiceService ,
              public modalController: ModalController) {
    console.log('id', navParams.get('information'));
    console.log('id', navParams.get('description'));
   }

   
   expenseModel = {
    date : Date.now(),
    description : '',
    id : '',
    product : '',
    amountPaid : null,
    receiver : '',
    admin :  '',
    information : ''
    };

  ngOnInit() {
   this.expenseModel.admin =   localStorage.getItem('appUser');
   this.expenseModel.id =  this.navParams.get('id');
   this.expenseModel.description =  this.navParams.get('description');
   this.expenseModel.product =  this.navParams.get('product');
   this.expenseModel.receiver =  this.navParams.get('receiver');
   this.expenseModel.amountPaid =  this.navParams.get('amountPaid');
   this.expenseModel.information =  this.navParams.get('information');
   this.expenseModel.information =  this.navParams.get('description');
   console.log(this.expenseModel);
  }

  closeModal(){
    this.modalController.dismiss();
  }

  updateExpense(){
    this.loading = true;
    console.log(this.expenseModel);
    this.userService.updateExpense(this.expenseModel).subscribe(
      res => {
        this.loading = false;
        this.userService.generalToastSh(res['msg']);
      this.modalController.dismiss();
      },
      err => {
        this.loading = false;
        this.userService.generalToast(err.error.msg);
      }
    );
  }

}
