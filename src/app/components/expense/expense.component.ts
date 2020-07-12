import { ExpReturnModalComponent } from './../exp-return-modal/exp-return-modal.component';
import { ExpenseEditComponent } from './../expense-edit/expense-edit.component';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { IonRefresher, AlertController, ModalController } from '@ionic/angular';
import { UserServiceService } from 'src/app/shared/user-service.service';
import { NgForm } from '@angular/forms';
import { PayModalComponent } from '../pay-modal/pay-modal.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.scss'],
})
export class ExpenseComponent implements OnInit , OnDestroy {
  @ViewChild('refresherRef', {static : false}) refresherRef: IonRefresher;
  admin: any;
  loading  = true;
  Calmodel; 
  lastCredit:any;
  myDate  = new Date();
  myDayAndMonth:any  = new Date();
  expenseSub: Subscription;
  lastCreditSub: Subscription;

  constructor(public userService: UserServiceService, public modalController: ModalController,
              public alertController: AlertController) {
    this.admin = localStorage.getItem('appUser');
    this.returnModel.admin = localStorage.getItem('appUser');
    this.expenseModel.admin = this.admin;

    let appDay = new Date().getDate();
    this.searchModel.month =  new Date().getMonth() + 1;
    this.searchModel.year = new Date().getFullYear() ;
    setTimeout(()=> {
    this.getThisMonthExpense();
   },1000);
   
  }


balance: any;
expense: any = [];
showExpenseInput = false;
showList = true;
 
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
    search: '', fullname: '', day: null, month: null, year : null
    };
  
  balModel = {
    amount: null
  };

  ngOnInit() {
this.getBalance();
this.findLastCredit();


  }
  ngOnDestroy() {
    this.lastCreditSub.unsubscribe();
    this.expense = [];
    this.model = {
    filterOptions: '',
    search : ''
  };

    this.expenseModel = {
    date : Date.now(),
    description : '',
    product : '',
    amountPaid : null,
    receiver : '',
    admin :  localStorage.getItem('appUser'),
    information : '',
    verified : false
    };
  }

      returnModel = {
        id: '',
        admin: ''
      };


    getThisMonthExpense(){
      this.expense = this.userService.expenseSaver;
      if(this.expense.length){
     console.log('data exist');
     this.loading = false;
     return;
    }else{
      console.log('no saved data....')
      this.loading = true;
      this.expenseSub =  this.userService.thisMonthExpense(this.searchModel).subscribe(
         res => {
           this.loading = false;
           this.expense = res['record'];
           this.userService.expenseSaver =  this.expense;
         },
         err => {
           this.loading = false;
           console.log(err);
           this.expense = [];
           let message = (err.error.msg) ? err.error.msg : 'Internet connnection failed!';
           this.userService.generalToastSh(message);
         }
        );
    }
    }


    refreshExpense(){
      console.log('refresh expense..')
      this.loading = true;
      this.expenseSub =  this.userService.thisMonthExpense(this.searchModel).subscribe(
           res => {
             this.loading = false;
             this.expense = res['record'];
             this.refresherRef.complete();
             this.userService.expenseSaver =  this.expense;
             console.log(this.userService.expenseSaver)
           },
           err => {
             this.loading = false;
             console.log(err);
             this.refresherRef.complete();
             this.expense = [];
             let message = (err.error.message) ? err.error.message : 'Internet connnection failed!';
             this.userService.generalToastSh(message);
           }
          );
      
      }

  async editExpense(id, description, product, amountPaid, receiver, information) {
                      const modal = await this.modalController.create({ component: ExpenseEditComponent,
                    componentProps: {
                      'id': id,  'description':  description,
                      'product': product,  'amountPaid': amountPaid,
                      'receiver': receiver, 'information': information
                    } } );
                      modal.onDidDismiss().then(() => {   this.refreshExpense();  this.getBalance(); });
                      return await modal.present();
}


  searchExpense() {
    this.loading = true;
    this.userService.searchExpense(this.searchModel).subscribe(
      res => {
        this.loading = false;
        console.log(res);
        this.expense = res['expenses'];
        this.userService.expenseSaver = this.expense;
      },
      err => {
        this.loading= false;
        this.expense = [];
        let message = (err.error.msg) ? err.error.msg : 'Internet connnection failed!';
        this.userService.generalToast(message);
        console.log(err);
      }
    );
  }

  monthAndYear(){
    this.searchModel.month = null, this.searchModel.year = null;
    this.searchModel.month = new Date(this.myDate).getMonth() + 1;
    this.searchModel.year = new Date(this.myDate).getFullYear() ;
    console.log(this.searchModel);
    this.refreshExpense();
 
 } 
//  Ccustom date picker
      // tslint:disable-next-line: member-ordering
      filter_Month_Year: any = {
        buttons: [{
          text: 'CANCEL',
          handler: (event) => console.log('calender cancelled')
        }, {
          text: 'SEARCH',
          handler: (event) => {
           this.searchModel.month = event.month.value;
           this.searchModel.year = event.year.value;
           this.refreshExpense();
          }
        }]
      };

      submitDate(form: NgForm){
        console.log(this.model);
        this.loading = true;
        this.userService.findExpenseByDate(this.model).subscribe(
          res => {
            this.loading = false;
            console.log(res);
            this.expense = res['expenses'];
            this.userService.expenseSaver =  this.expense;
          },
          err => {
            this.loading = false;
            this.expense = [];
        let message = (err.error.msg) ? err.error.msg : 'Internet connnection failed!';
            this.userService.generalToastSh(message);
            console.log('my error',err);
          }
        );
      }
    
       
    

 async okRecord(id){
  const alert = await this.alertController.create({
    header: `CONFIRM EXPENSE?`,
    buttons: [
      {
        text: 'Cancel', role: 'cancel', cssClass: 'danger',
        handler: (blah) => {
          console.log('cancel amount input');
        }
      }, {
        text: 'Confirm',
        cssClass : 'danger',
        handler: (values) => {
          console.log(id);
          this.loading = true;
          this.userService.confirmExpense(id).subscribe(
          res => {
            this.loading = false;
            this.userService.generalToastSh(res['msg']);
            this.refreshExpense();
          },
          err => {
            this.loading = false;
        let message = (err.error.msg) ? err.error.msg : 'Internet connnection failed!';
            this.userService.generalToast(message);
          }
        );
      }
        }
      
    ]
  });
  await alert.present();
 }
 async UnokRecord(id){
  this.userService.unConfirmExpense(id).subscribe(
    res => {
      this.refreshExpense();
    }
  );
 }


  doRefresh(event) {
    console.log('refreshing expense')
    this.refreshExpense();
    this.getBalance();

  }




  getBalance(): void {
    this.loading = true;
    this.userService.getBalance().subscribe(
      res => {
        this.loading = false;
        this.refresherRef.complete();
        console.log(res['balance']['0']['balance']);
        this.balance = res['balance']['0']['balance'];
      },
      err => {
        this.loading = false;
        console.log(err);
        let message = (err.error.msg) ? err.error.msg : 'Internet connnection failed!';
        this.userService.generalToast(message);
      }
    );
  }

 async disproveAlert(id) {
    const alert = await this.alertController.create({
      header: 'DISPROVE EXPENSE?',
      message : `<p class="text-danger">reverse approve!</p>`,
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
            const data = {admin : this.expenseModel.admin, id};
            this.expenseModel.admin;
            this.userService.reverseExpense(data).subscribe(
              res => {
                this.loading = false;
                this.userService.generalToast(res['msg']);
                this.refreshExpense();
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

  async verify(id) {
    const alert = await this.alertController.create({
      header: 'VERIFY THIS EXPENSE?',
      message : `you are about to confirm this expense. `,
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
                this.userService.generalToastSh(res['msg']);
                this.loading = false;
                this.refreshExpense();
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
 
  findLastCredit() {
   this.lastCreditSub = this.userService.getLastCredit().subscribe(
      res => {
        // console.log(res['credit']);
        this.lastCredit = res['credit'];
      }
    );
  }


  async addBalance() {
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
              val.admin = this.expenseModel.admin;
              val.date = Date.now();
              this.userService.updateBalance(val).subscribe(
                res => {
                  this.loading = false;
                  this.balance = res['balance'];
                  this.userService.generalToast(res['msg']);
                  this.refreshExpense();
                  this.getBalance();
                  this.findLastCredit();
                },
                err => {
                  this.loading = false;
                  let message = (err.error.msg) ? err.error.msg : 'Internet connnection failed!';
                  this.userService.generalToast(message);
                }
              );
            }
          }
        ]
      });

      await alert.present();

  }

  async returnStock() {
    const modal = await this.modalController.create({
      component: ExpReturnModalComponent,
    });
    modal.onDidDismiss().then(()=> {
      this.refreshExpense();
      this.getBalance();
      console.log('modal dismiss...');
    });
    return await modal.present();
    
   } 

  submitExpense(form: NgForm) {
    this.loading = true;
    console.log(this.expenseModel);
    this.userService.submitExpense(this.expenseModel).subscribe(
      res => {
        this.loading = false;
        this.cancelForm();
        console.log(res);
        this.getBalance();
        this.refreshExpense();
        this.clearModel();
      },
      err => {
        this.loading = false;
        let message = (err.error.msg) ? err.error.msg : 'Internet connnection failed!';
        this.userService.generalToastSh(message);
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

  addExpense() {
    this.showExpenseInput = true;
    this.showList = false;
  }

  cancelForm() {
    this.showExpenseInput = false;
    this.showList = true;

  }


}
