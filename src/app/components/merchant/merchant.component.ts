import { MerchantModalComponent } from './../merchant-modal/merchant-modal.component';
import { RecordService } from 'src/app/shared/record.service';
import { UserServiceService } from './../../shared/user-service.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgbDatepickerNavigateEvent } from '@ng-bootstrap/ng-bootstrap';
import { ModalController, AlertController } from '@ionic/angular';
import { OutletService } from 'src/app/shared/outlet.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-merchant',
  templateUrl: './merchant.component.html',
  styleUrls: ['./merchant.component.scss'],
})
export class MerchantComponent implements OnInit {
  @ViewChild('dateClass', {static : false}) dateClass: ElementRef;
  // @ViewChild('items', {static : false}) items: ElementRef;
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
    this.getSalesRecord();
    
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

  
 

  dateNavigate($event: NgbDatepickerNavigateEvent) {
    this.yearModel.month = $event.next.month;
    this.yearModel.year = $event.next.year;
    console.log(this.yearModel);
    this.recordService.getSomeData(this.yearModel).subscribe(
      res => {
        console.log(res);
        this.salesRecord = res['record'];
      },
      err => {
        console.log(err);
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
   this.getSalesRecord();
   console.log('dismiss')
 });
 return await modal.present();
}

getSalesRecord(){
  console.log('geting record');
  this.outletService.getSaleRecord().subscribe(
    res => {
      console.log('response',res);
      this.salesRecord = res['record'];
    },
    err => {
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
}
