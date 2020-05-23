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
  myDate  = new Date();
  myDayAndMonth:any  = new Date();

  constructor(public userService: UserServiceService, public modalController: ModalController,
              public alertController: AlertController) {
    this.admin = localStorage.getItem('appUser');
    this.returnModel.admin = localStorage.getItem('appUser');
    this.expenseModel.admin = this.admin;

    let appDay = new Date().getDate();
    this.searchModel.month =  new Date().getMonth() + 1;
    this.searchModel.year = new Date().getFullYear() ;
   
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
this.userService.thisMonthExpense(this.searchModel);
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

  async editExpense(id, description, product, amountPaid, receiver, information) {
                      const modal = await this.modalController.create({ component: ExpenseEditComponent,
                    componentProps: {
                      'id': id,  'description':  description,
                      'product': product,  'amountPaid': amountPaid,
                      'receiver': receiver, 'information': information
                    } } );
                      modal.onDidDismiss().then(() => {   this.userService.reloadExpense(this.searchModel);  this.getBalance(); });
                      return await modal.present();
}


  searchExpense() {
    this.loading = true;
    this.userService.searchExpense(this.searchModel);
  }

  monthAndYear(){
    this.searchModel.month = null, this.searchModel.year = null;
    this.searchModel.month = new Date(this.myDate).getMonth() + 1;
    this.searchModel.year = new Date(this.myDate).getFullYear() ;
    console.log(this.searchModel);
    this.userService.reloadExpense(this.searchModel);
 
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
           this.userService.reloadExpense(this.searchModel);
          }
        }]
      };

      submitDate(form: NgForm){
        console.log(this.model);
        this.userService.findExpenseByDate(this.model);
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
          this.userService.loadingExpense = true;
          this.userService.confirmExpense(id).subscribe(
          res => {
            this.userService.loadingExpense = false;
            this.userService.generalToastSh(res['msg']);
            this.userService.reloadExpense(this.searchModel);
          },
          err => {
            this.userService.loadingExpense = false;
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
      this.userService.reloadExpense(this.searchModel);
    }
  );
 }


  doRefresh(event) {
    this.userService.reloadExpense(this.searchModel);
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
            this.userService.loadingExpense = true;
            const data = {admin : this.expenseModel.admin, id};
            this.expenseModel.admin;
            this.userService.reverseExpense(data).subscribe(
              res => {
                this.userService.loadingExpense = false;
                this.userService.generalToast(res['msg']);
                this.userService.reloadExpense(this.searchModel);
              },
              err => {
                this.userService.loadingExpense = false;
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
            this.userService.loadingExpense = true;
            this.userService.verifyExpense(id).subscribe(
              res => {
                console.log(res);
                this.userService.generalToast(res['msg']);
                this.userService.loadingExpense = false;
                this.userService.reloadExpense(this.searchModel);
              },
              err => {
                this.userService.loadingExpense = false;
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
              this.userService.loadingExpense = true;
              // give a name to object;
              val.name = 'BALANCE';
              val.admin = this.expenseModel.admin;
              val.date = Date.now();
              this.userService.updateBalance(val).subscribe(
                res => {
                  this.userService.loadingExpense = false;
                  this.balance = res['balance'];
                  this.userService.generalToast(res['msg']);
                  this.userService.reloadExpense(this.searchModel);
                  this.getBalance();
                  this.findLastCredit();
                },
                err => {
                  this.userService.loadingExpense = false;
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
      this.userService.reloadExpense(this.searchModel);
      this.getBalance();
      console.log('modal dismiss...');
    });
    return await modal.present();
    
   } 

  submitExpense(form: NgForm) {
    this.userService.loadingExpense = true;
    console.log(this.expenseModel);
    this.userService.submitExpense(this.expenseModel).subscribe(
      res => {
        this.loading = false;
        this.cancelForm();
        console.log(res);
        this.getBalance();
        this.userService.reloadExpense(this.searchModel);
        this.clearModel();
      },
      err => {
        this.userService.loadingExpense = false;
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
