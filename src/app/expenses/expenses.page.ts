import { UserServiceService } from './../shared/user-service.service';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertController, IonRefresher } from '@ionic/angular';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.page.html',
  styleUrls: ['./expenses.page.scss'],
})
export class ExpensesPage implements OnInit , OnDestroy {
  @ViewChild('refresherRef', {static : false}) refresherRef: IonRefresher; 
  admin : any;
  loading  = false;
 
  constructor(public userService : UserServiceService,
              public alertController: AlertController) { 
    this.admin = localStorage.getItem('appUser');
    this.expenseModel.admin = this.admin;
    this.getExpense();
    this.getBalance();
  }


balance : any;
expense : any = []; 
showExpenseInput = false;
showList = true;

  expenseModel = {
  date : Date.now(),
  description : '',
  product : '',
  amountPaid : null,
  receiver : '',
  admin : localStorage.getItem('appUer'),
  information : '',
  verified : false
  }

  model = {
    filterOptions:'',
    search:''
  } 

  balModel = {
    amount: null
  }

  ngOnInit() {

  }
  ngOnDestroy(){
     this.model = {
    filterOptions:'',
    search :''
  }
     this. expense = []; 
     
 this.expenseModel = {
    date : Date.now(),
    description : '',
    product : '',
    amountPaid : null,
    receiver : '',
    admin : localStorage.getItem('appUer'),
    information : '',
    verified : false
    }
  }

  selectChange(event){
    console.log(event);
    this.loading = true;
    this.userService.selectExpenseByCategory(event).subscribe(
      res => {
        this.loading = false;
        this.expense = res['expenses'];
        console.log(res);
      },
      err => {
        this.loading = false;
        this.userService.generalToast(err.error['msg']);
      }
    );
  }

  searchExpense(){
    this.loading = true;
    let search = {search: this.model.search}
    console.log(search);
    this.userService.searchExpense(search).subscribe(
      res=> {
        this.loading = false;
        console.log(res);
        this.expense = res['expenses'];
      },
      err => {
        this.loading = false;
        console.log(err);
      }
    );

  }

  doRefresh(event){
    this.loading = true;
    this.getExpense();
      this.loading = false;
  }



  getExpense(){
    this.loading = true;
    this.userService.getExpenses().subscribe(
      res => {
        this.loading = false;
        this.expense = res['expenses'];
        this.refresherRef.complete();
      },
      err => {
        this.loading = false;
        this.refresherRef.complete();
        console.log(err);
        this.userService.generalToast(err.error['msg']);
      }
    );
  }

  getBalance() : void{
    this.loading = true;
    this.userService.getBalance().subscribe(
      res => {
        this.loading = false;
        console.log(res['balance']['0']['balance']);
        this.balance = res['balance']['0']['balance'];
      },
      err => {
        this.loading = false;
        console.log(err);
        this.userService.generalToast(err.error['msg']);
      }
    );
  }

 async disproveAlert(id){
    const alert = await this.alertController.create({
      header: 'DISPROVE EXPENSE?',
      message :`<p class="text-danger">reverse approve!</p>`,
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
            let data = {admin : this.expenseModel.admin,
                      id:id}

            this.expenseModel.admin
            this.userService.reverseExpense(data).subscribe(
              res => {
                this.loading = false;
                console.log(res);
                this.userService.generalToast(res['msg']);
                this.getExpense();
              },
              err => {
                this.loading = false;
                console.log(err);
                this.userService.generalToast(err.error['msg']);
              }
            );
        
          }
        }
      ]
    });
    await alert.present();
  }

  async verify(id){
    const alert = await this.alertController.create({
      header: 'VERIFY THIS EXPENSE?',
      message :`you are about to confirm this expense. `,
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
            this.userService.verifyExpense(id).subscribe(
              res => {
                console.log(res);
                this.userService.generalToast(res['msg']);
                this.loading = false;
                this.getExpense();
              },
              err => {
                this.userService.generalToast(err.error.msg);
              }
            )
        
          }
        }
      ]
    });
    await alert.present();
  }


  async addBalance(){
      const alert = await this.alertController.create({
        header: 'ENTER AMOUNT',
        inputs: [
          {
            name: 'amount',
            type: 'text',
            placeholder: 'Enter amount'
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
            cssClass : 'success',
            handler: (val) => {
              this.loading = true;
              // give a name to object;
              val.name = 'BALANCE';
              this.userService.updateBalance(val).subscribe(
                res => {
                  this.loading = false;
                  this.balance = res['result']['balance'];
                  this.userService.generalToast(res['msg']);
                },
                err => {
                  this.loading = false;
                  this.userService.generalToast(err.error['msg']);
                }
              );
            }
          }
        ]
      });
    
      await alert.present();
    
  }

  submitExpense(form : NgForm){
    this.loading = true;
    console.log(this.expenseModel);
    this.userService.submitExpense(this.expenseModel).subscribe(
      res => {
        this.loading = false;
        this.cancelForm();
        console.log(res);
        this.getBalance();
        this.getExpense();
        this.clearModel();
      },
      err => {
        this.loading = false;
        console.log(err);
      }
    );
  }

  

  clearModel(){
    this.expenseModel = {
      date : Date.now(),
      description : '',
      product : '',
      amountPaid : null,
      receiver : '',
      admin : this.admin,
      information : '',
      verified : false
      }
  }

  addExpense(){
    this.showExpenseInput = true;
    this.showList = false;
  }

  cancelForm(){
    this.showExpenseInput = false;
    this.showList = true;

  }


}
