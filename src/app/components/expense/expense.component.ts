import { ExpReturnModalComponent } from './../exp-return-modal/exp-return-modal.component';
import { ExpenseEditComponent } from './../expense-edit/expense-edit.component';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { IonRefresher, AlertController, ModalController } from '@ionic/angular';
import { UserServiceService } from 'src/app/shared/user-service.service';
import { NgForm } from '@angular/forms';
import { PayModalComponent } from '../pay-modal/pay-modal.component';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.scss'],
})
export class ExpenseComponent implements OnInit , OnDestroy {
  @ViewChild('refresherRef', {static : false}) refresherRef: IonRefresher;
  admin: any;
  loading  = false;
  Calmodel; 
  lastCredit:any;

  constructor(public userService: UserServiceService,
              public modalController: ModalController,
              public alertController: AlertController) {
    this.admin = localStorage.getItem('appUser');
    this.returnModel.admin = localStorage.getItem('appUser');
    this.expenseModel.admin = this.admin;
   
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
    search: '', fullname: '', month: null, year : null
    };
  
  balModel = {
    amount: null
  };

  ngOnInit() {
this.getBalance();
this.findLastCredit();
  }
  ngOnDestroy() {
     this.model = {
    filterOptions: '',
    search : ''
  };


     this. expense = [];

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

  async editExpense(id, description, product,
                    amountPaid, receiver, information) {
                      console.log(description, information);
                      const modal = await this.modalController.create({
                    component: ExpenseEditComponent,
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
                            this.getExpense();
                            this.getBalance();
            });
                      return await modal.present();
}

  submitDate(form: NgForm) {
    this.Calmodel = form.value;
    console.log(this.Calmodel);
    this.findBydate();
  }

  findBydate() {
    this.loading = true;
    this.userService.findExpenseByDate(this.Calmodel).subscribe(
      res => {
        this.loading = false;
        this.expense = res['expenses'];
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

  selectChange(event) {
    console.log(event);
    this.loading = true;
    this.userService.selectExpenseByCategory(event).subscribe(
      res => {
        this.loading = false;
        this.expense = res['expenses'];

      },
      err => {
        this.loading = false;
        this.userService.generalToast(err.error.msg);
      }
    );
  }

  searchExpense() {
    this.loading = true;
    this.userService.searchExpense(this.searchModel).subscribe(
      res => {
        this.loading = false;
        console.log(res);
        this.expense = res['expenses'];
      },
      err => {
        this.loading = false;
        this.expense = [];
        this.userService.generalToastSh(err.error.msg);
        console.log(err);
      }
    );

  }

  thisMonthRecord(event){
    let month = event.next.month;
    let year = event.next.year;
    this.searchModel.month = event.next.month;
    this.searchModel.year = event.next.year;
    console.log(this.searchModel);
    this.userService.thisMonthExpense(this.searchModel).subscribe(
      res => {
        console.log('this month', res);
        this.expense = res['record'];
      },
      err => {
        console.log(err);
        this.expense = [];
        this.userService.generalToastSh(err.error.msg);
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
            this.getExpense();
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
 async UnokRecord(id){
  this.userService.unConfirmExpense(id).subscribe(
    res => {
      this.getExpense();
    }
  );
 }


  doRefresh(event) {
    this.loading = true;
    this.getExpense();
    this.getBalance();
    this.loading = false;
  }



  getExpense() {
    this.loading = true;
    this.userService.getExpenses().subscribe(
      res => {
        this.loading = false;
        this.expense = res['expenses'];
        this.refresherRef.complete();
        console.log(res);
        this.expense.forEach(element => {
          console.log(element);
        });
      },
      err => {
        this.loading = false;
        this.refresherRef.complete();
        console.log(err);
        this.userService.generalToast(err.error.msg);
      }
    );
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
        this.userService.generalToast(err.error.msg);
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
            const data = {admin : this.expenseModel.admin,
                      id};

            this.expenseModel.admin;
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
                this.userService.generalToast(res['msg']);
                this.loading = false;
                this.getExpense();
              },
              err => {
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
    this.userService.getLastCredit().subscribe(
      res => {
        console.log(res['credit']);
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
                  this.getExpense();
                  this.getBalance();
                  this.findLastCredit();
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

  async returnStock() {
    const modal = await this.modalController.create({
      component: ExpReturnModalComponent,
    });
    modal.onDidDismiss().then(()=> {
      this.getExpense();
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
        this.getExpense();
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

  addExpense() {
    this.showExpenseInput = true;
    this.showList = false;
  }

  cancelForm() {
    this.showExpenseInput = false;
    this.showList = true;

  }


}
