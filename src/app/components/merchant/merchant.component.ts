import { MerchantModalComponent } from './../merchant-modal/merchant-modal.component';
import { RecordService } from 'src/app/shared/record.service';
import { UserServiceService } from './../../shared/user-service.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgbDatepickerNavigateEvent } from '@ng-bootstrap/ng-bootstrap';
import { ModalController, AlertController, IonRefresher } from '@ionic/angular';
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
loading = false;
salesRecord = [];
model;
  constructor(public userService: UserServiceService, 
              public outletService: OutletService,
              public modalController: ModalController,
              public alertController: AlertController,
              private recordService: RecordService ) {
              
               }
yearModel = {
  month : null,
  year : null
}

  ngOnInit() {
    // this.getSalesRecord();
    
  }

  submitDate(form: NgForm){
    this.salesRecord = [];
    console.log(this.model);
    this.loading = true;
    this.outletService.findmerchantByDay(this.model).subscribe(
      res => {
        this.loading = false;
        this.salesRecord = res['record'];
      },
      err => { 
        this.loading = false;
        this.userService.generalToastSh(err.error.msg);
      }
    );
  }

   
  doRefresh(event){ 
    this.loading = true;
    this.recordService.getSomeData(this.yearModel).subscribe(
      res => {
        console.log(res);
        this.loading = false;
        this.refresherRef.complete();
        this.salesRecord = res['record'];
      },
      err => { 
        console.log(err);
        this.loading = false;
        this.refresherRef.complete();
        this.salesRecord = [];
        this.userService.generalToast(err.error.msg);
      }
    );
  }
  
 

  dateNavigate($event: NgbDatepickerNavigateEvent) {
    this.loading = true;
    this.yearModel.month = $event.next.month;
    this.yearModel.year = $event.next.year;
    console.log(this.yearModel);
    this.recordService.getSomeData(this.yearModel).subscribe(
      res => {
        console.log(res);
        this.loading = false;
        this.salesRecord = res['record'];
      },
      err => { 
        console.log(err);
        this.loading = false;
        this.salesRecord = [];
        this.userService.generalToast(err.error.msg);
      }
    );
  }


  async merchantModal() {
 const modal = await this.modalController.create({
   component: MerchantModalComponent,
 }

 );
 
 modal.onDidDismiss().then(()=> {
  this.recordService.getSomeData(this.yearModel).subscribe(
    res => {
      console.log(res);
      this.loading = false;
      this.salesRecord = res['record'];
    },
    err => { 
      console.log(err);
      this.loading = false;
      this.salesRecord = [];
      this.userService.generalToast(err.error.msg);
    }
  );
   console.log('dismiss')
 });
 return await modal.present();
}

getSalesRecord(){
  this.loading = true;
  console.log('geting record');
  this.outletService.getSaleRecord().subscribe(
    res => {
      this.loading = false;
      console.log('response',res);
      this.salesRecord = res['record'];
    },
    err => {
      this.loading = false;
      console.log(err);
    }
  );
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
          this.loading = true;
          this.outletService.okSaleRecord(id).subscribe(
            res => {
              this.loading = false;
              this.userService.generalToastSh(res['msg']);
              this.getSalesRecord();
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
              this.getSalesRecord();
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
              this.getSalesRecord();
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
              this.getSalesRecord();
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
