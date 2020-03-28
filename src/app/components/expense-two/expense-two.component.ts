import { EditExpenseTwoComponent } from './../edit-expense-two/edit-expense-two.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonRefresher, ModalController, AlertController } from '@ionic/angular';
import { UserServiceService } from 'src/app/shared/user-service.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-expense-two',
  templateUrl: './expense-two.component.html',
  styleUrls: ['./expense-two.component.scss'],
})
export class ExpenseTwoComponent implements OnInit {
  @ViewChild('refresherRef', {static : false}) refresherRef: IonRefresher;
  admin: any;
  loading  = false;
  Calmodel; 

  totalAmount = 0;

  constructor(public userService: UserServiceService,
              public modalController: ModalController,
              public alertController: AlertController) { }

   
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

    
  model = {
    filterOptions: '',
    search: ''
  };

  searchModel = { 
    search: '', fullname: '', month: null, year : null
    };
  
  balModel = {
    amount: null
  };


balance: any;
expense: any = [];
showExpenseInput = false;
showList = true;
  ngOnInit() {}

  addExpense() {
    this.showExpenseInput = true;
    this.showList = false;
  }

  thisMonthRecord(event){
    this.totalAmount = 0;
    this.expense = [];
    let month = event.next.month;
    let year = event.next.year;
    this.searchModel.month = event.next.month;
    this.searchModel.year = event.next.year;
    console.log(this.searchModel);
    this.userService.getExpenseTwo(this.searchModel).subscribe(
      res => {
        console.log('this month', res);
        this.expense = res['record'];
        this.expense.forEach((record)=> {
          this.totalAmount += record.amountPaid;
        });
      },
      err => {
        console.log(err);
        this.expense = [];
        this.totalAmount = 0;
        this.userService.generalToastSh(err.error.msg);
      }
    );
 }

 currentRecord(){
   this.totalAmount = 0;
   this.expense = [];
  console.log(this.searchModel);
  this.userService.getExpenseTwo(this.searchModel).subscribe(
    res => {
      console.log('this month', res);
      this.expense = res['record'];
      this.expense.forEach((record)=> {
        this.totalAmount += record.amountPaid;
      });
      this.refresherRef.complete();
    },
    err => {
      console.log(err);
      this.refresherRef.complete();
      this.expense = [];
      this.userService.generalToastSh(err.error.msg);
    }
  ); 
}

 findBydate() {
  this.loading = true;
  this.totalAmount = 0;
  this.userService.getExpense2ByDate(this.Calmodel).subscribe(
    res => {
      this.loading = false;
      this.expense = res['expenses'];
      this.expense.forEach((record)=> {
        this.totalAmount += record.amountPaid;
      });
      console.log(res);
    },
    err => {
      this.loading = false;
      console.log();
      this.expense = [];
      this.userService.generalToastSh(err.error.msg);
    }
  );
}

async editExpense(id, description, product,
  amountPaid, receiver, information) {
    console.log(description, information);
    const modal = await this.modalController.create({
  component: EditExpenseTwoComponent,
  componentProps: {
    'id': id,
    'description':  description,
    'product': product,
    'amountPaid': amountPaid,
    'receiver': receiver,
    'information': information
  }
}
);
    modal.onDidDismiss().then(() => {
        this.currentRecord();
});
    return await modal.present();
}


submitDate(form: NgForm) {
  this.Calmodel = form.value;
  console.log(this.Calmodel);
  this.findBydate();
}

submitExpense(form: NgForm) {
  this.loading = true;
  console.log(this.expenseModel);
  this.userService.submitExpense2(this.expenseModel).subscribe(
    res => {
      this.loading = false;
      this.cancelForm();
      console.log(res);
      // this.getBalance();
      // this.getExpense();
      this.clearModel();
    },
    err => {
      this.loading = false;
      console.log(err);
    }
  );
}

clearModel() {
  this.expenseModel = {
    date : Date.now(),
    description : '',
    product : '',
    amountPaid : null,
    receiver : '',
    admin : this.admin,
    information : '',
    verified : false
    };
}

cancelForm() {
  this.showExpenseInput = false;
  this.showList = true;

}

doRefresh(event) {
  this.loading = true;
  this.currentRecord();
  this.loading = false;
}

}
