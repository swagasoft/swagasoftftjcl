import { MerchantModalComponent } from './../merchant-modal/merchant-modal.component';
import { RecordService } from 'src/app/shared/record.service';
import { UserServiceService } from './../../shared/user-service.service';
import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { NgbDatepickerNavigateEvent } from '@ng-bootstrap/ng-bootstrap';
import { ModalController, AlertController, IonRefresher, IonInfiniteScroll } from '@ionic/angular';
import { OutletService } from 'src/app/shared/outlet.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-merchant',
  templateUrl: './merchant.component.html',
  styleUrls: ['./merchant.component.scss'],
})
export class MerchantComponent implements OnInit, OnDestroy {
  @ViewChild('dateClass', {static : false}) dateClass: ElementRef;
  @ViewChild('refresherRef', {static : false}) refresherRef: IonRefresher;
  // @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

page = 0;
model;
loading = true;
myDate  = new Date();
salesRecord = [];



  constructor(public userService: UserServiceService, 
              public outletService: OutletService,
              public modalController: ModalController,
              public alertController: AlertController,
              public recordService: RecordService ) {
              
                let appMonth = new Date().getMonth() + 1;
                let appYear = new Date().getFullYear() ;
                this.searchModel.month = appMonth;
                this.searchModel.year = appYear;
               }
               
searchModel = {
  month : null,
  year : null
}

  ngOnInit() {
setTimeout(()=> {
  this.getMerchantRecord();
},1000);
    
  }

  ngOnDestroy(){

  }

  getMerchantRecord(){
    if(this.recordService.salesSaver.length){
      this.salesRecord = this.recordService.salesSaver ; 
      this.loading = false;
    }else{
      console.log('no saved data....', this.recordService.salesSaver)
      this.recordService.merchantSales(this.searchModel).subscribe(
        res => {
          this.loading = false;
          console.log(res);
          this.loading = false;
          this.salesRecord = res['record'];
          this.recordService.salesSaver = this.salesRecord;
          console.log(this.recordService.salesSaver);
        },
       
        err => { 
          this.loading = false;
          console.log(err);
          this.salesRecord = [];
          let message = (err.error.msg) ? err.error.msg : 'Internet connnection failed!';
          this.userService.generalToast(message);
        }
      );
      // end
    }
    
  }

  reloadRecord(){
    this.recordService.merchantSales(this.searchModel).subscribe(
      res => {
        this.loading = false;
        this.refresherRef.complete();
        console.log(res);
        this.loading = false;
        this.salesRecord = res['record'];
        this.recordService.salesSaver = this.salesRecord;
      },
     
      err => { 
        this.loading = false;
        this.refresherRef.complete();
        console.log(err);
        this.salesRecord = [];
        this.userService.generalToast(err.error.msg);
      }
    );
  }


    // tslint:disable-next-line: member-ordering
    filter_Month_Year: any = {
      buttons: [{
        text: 'CANCEL',
        handler: (event) => console.log('calender cancelled')
      }, {
        text: 'SEARCH',
        handler: (event) => {
          this.loading = true;
         this.searchModel.month = event.month.value;
         this.searchModel.year = event.year.value;
         this.recordService.reloadMerchantSales(this.searchModel).subscribe(
          res => {
            this.loading = false;
            this.salesRecord = res['record'];
            this.recordService.salesSaver = this.salesRecord;
          },
         
          err => { 
            console.log(err);
            this.loading = false;
            this.salesRecord = [];
            this.userService.generalToast(err.error.msg);
          }
        );
        }
      }]
    };




  submitDate(form: NgForm){
    console.log(this.model);
    this.loading = true;
    this.salesRecord = [];
    this.recordService.findmerchantByDay(this.model).subscribe(
      res => {
        this.loading = false;
        this.salesRecord = res['record'];
        this.recordService.salesSaver = this.salesRecord;
      },
      err => { 
        this.loading = false;
        this.userService.generalToastSh(err.error.msg);
      }
    );
  }

   
  doRefresh(event){ 
  this.reloadRecord();
  }
  

  async merchantModal() {
 const modal = await this.modalController.create({ component: MerchantModalComponent});
 modal.onDidDismiss().then(()=> {
  this.reloadRecord();
 });
 return await modal.present();
}


async clickOk(id){
  const alert = await this.alertController.create({
    header: `OK RECORD?`,
   message: 'process cannot be reversed',
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
          this.recordService.loading = true;
          this.outletService.okSaleRecord(id).subscribe(
            res => {
              this.recordService.loading = false;
              this.userService.generalToastSh(res['msg']);
              this.reloadRecord();
            },
            err => {
              this.recordService.loading = false;
              this.userService.generalToast(err.error.msg);
            }
          );
        
      }
        }
      
    ]
  });
  await alert.present();
}

async delete(id){
  const alert = await this.alertController.create({
    header: `DELETE RECORD?`,
   message: 'process cannot be reversed',
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
          this.outletService.deleteRecord(id).subscribe(
            res => {
              this.loading = false;
              this.userService.generalToastSh(res['msg']);
              this.reloadRecord();
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



async clickVerify(id){
  const alert = await this.alertController.create({
    header: `VERIFY RECORD?`,
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
          this.outletService.verifySaleRecord(id).subscribe(
            res => {
              this.loading = false;
              this.userService.generalToastSh(res['msg']);
              this.reloadRecord();
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
async disprove(id){
  const alert = await this.alertController.create({
    header: `DISPROVE RECORD?`,
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
          this.outletService.disproveRecord(id).subscribe(
            res => {
              this.loading = false;
              this.userService.generalToastSh(res['msg']);
              this.reloadRecord();
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
}
