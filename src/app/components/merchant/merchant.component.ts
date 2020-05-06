import { MerchantModalComponent } from './../merchant-modal/merchant-modal.component';
import { RecordService } from 'src/app/shared/record.service';
import { UserServiceService } from './../../shared/user-service.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgbDatepickerNavigateEvent } from '@ng-bootstrap/ng-bootstrap';
import { ModalController, AlertController, IonRefresher, IonInfiniteScroll } from '@ionic/angular';
import { OutletService } from 'src/app/shared/outlet.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-merchant',
  templateUrl: './merchant.component.html',
  styleUrls: ['./merchant.component.scss'],
})
export class MerchantComponent implements OnInit {
  @ViewChild('dateClass', {static : false}) dateClass: ElementRef;
  @ViewChild('refresherRef', {static : false}) refresherRef: IonRefresher;
  // @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

page = 0;
model;
myDate  = new Date();


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
    this.recordService.merchantSales(this.searchModel);
    
  }


    // tslint:disable-next-line: member-ordering
    filter_Month_Year: any = {
      buttons: [{
        text: 'CANCEL',
        handler: (event) => console.log('calender cancelled')
      }, {
        text: 'SEARCH',
        handler: (event) => {
         console.log('clicked search..',event)
         console.log(event.month.value);
         this.searchModel.month = event.month.value;
         this.searchModel.year = event.year.value;
         this.recordService.reloadMerchantSales(this.searchModel);
        }
      }]
    };




  submitDate(form: NgForm){
    console.log(this.model);
    this.recordService.findmerchantByDay(this.model);
  }

   
  doRefresh(event){ 
    this.recordService.reloadMerchantSales(this.searchModel)
    setTimeout(()=> {
      this.refresherRef.complete();
    }, 2000);
  }
  

  async merchantModal() {
 const modal = await this.modalController.create({ component: MerchantModalComponent});
 modal.onDidDismiss().then(()=> {
  this.recordService.reloadMerchantSales(this.searchModel);
   console.log('dismiss')
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
              this.recordService.reloadMerchantSales(this.searchModel);
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
          this.recordService.loading = true;
          this.outletService.deleteRecord(id).subscribe(
            res => {
              this.recordService.loading = false;
              this.userService.generalToastSh(res['msg']);
              this.recordService.reloadMerchantSales(this.searchModel);
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
          this.recordService.loading = true;
          this.outletService.verifySaleRecord(id).subscribe(
            res => {
              this.recordService.loading = false;
              this.userService.generalToastSh(res['msg']);
              this.recordService.reloadMerchantSales(this.searchModel);
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
          this.recordService.loading = true;
          this.outletService.disproveRecord(id).subscribe(
            res => {
              this.recordService.loading = false;
              this.userService.generalToastSh(res['msg']);
              this.recordService.reloadMerchantSales(this.searchModel);
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
}
