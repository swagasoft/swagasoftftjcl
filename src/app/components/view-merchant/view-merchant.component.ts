import { Component, OnInit } from '@angular/core';
import { UserServiceService } from 'src/app/shared/user-service.service';
import { OutletService } from 'src/app/shared/outlet.service';
import { ModalController, AlertController } from '@ionic/angular';
import { RecordService } from 'src/app/shared/record.service';
import { NgbDatepickerNavigateEvent } from '@ng-bootstrap/ng-bootstrap';
import { IonicSelectableComponent } from 'ionic-selectable';

class Merchants {
  public id: string;
  public fullname: string;
}

@Component({
  selector: 'app-view-merchant',
  templateUrl: './view-merchant.component.html',
  styleUrls: ['./view-merchant.component.scss'],
})
export class ViewMerchantComponent implements OnInit {
loading = true;
allMerchant: any;
merchRecord = [];
presence = 0;
totalBottles = 0;
totalAmount = 0;
myDate  = new Date();
merchants: Merchants[];
merchant: Merchants;

  constructor(public userService: UserServiceService, 
    
              public outletService: OutletService,
              public modalController: ModalController,
              public alertController: AlertController,
              private recordService: RecordService) {
                this.getAllMerchant();
                let appMonth = new Date().getMonth() + 1;
                let appYear = new Date().getFullYear() ;
                this.searchModel.month = appMonth;
                this.searchModel.year = appYear;

              
               }


               portChange(event: {
                component: IonicSelectableComponent,
                value: any
              }) {
                console.log('port:', event.value.fullname);
                this.searchModel.merchant = event.value.fullname;
                this.loading = true;
                this.totalAmount = 0;
                    this.totalBottles = 0;
                this.outletService.getMerchantRecord(this.searchModel).subscribe(
                  res => {
                    this.loading = false;
                    console.log(res);
                    this.merchRecord = res['merchant'];
                    this.presence = this.merchRecord.length;
                    this.merchRecord.forEach((record)=> {
                      this.totalBottles += record.bottles;
                      this.totalAmount += record.amountSold;
                    });
                  },
                  err => {
                    this.loading = false;
                    this.totalAmount = 0;
                    this.totalBottles = 0;
                    console.log(err);
                    this.userService.generalToastSh(err.error.msg);
                  }
                );
              }


  model = {
    merchant:''
  }
  searchModel = {
    fulname:'',
    month: null,
    year : null,
    merchant : null

  }

  ngOnInit() {}

  getAllMerchant(){
    this.outletService.getAllMercahnt().subscribe(
      res => {
        this.loading = false;
        this.allMerchant = res['merchant'];
        this.merchants = res['merchant'];
        console.log(this.allMerchant);

      },
      err => {
        this.loading = false;
        this.userService.generalToast(err.error.msg);
        console.log(err);
      }
    );
  }


  dateNavigate($event: NgbDatepickerNavigateEvent) {
    this.merchRecord = [];
    this.totalAmount = 0;
    this.totalBottles = 0;
    this.searchModel.month = $event.next.month;
    this.searchModel.year = $event.next.year;
    console.log(this.searchModel);
    this.loading = true;
    this.outletService.findmerchantByMonth(this.searchModel).subscribe(
      res => {
        console.log(res);
        this.loading = false;
        this.merchRecord = res['record'];
        this.merchRecord.forEach((record)=> {
          this.totalBottles += record.bottles;
          this.totalAmount += record.amountSold;
        });
      },
      err => {
        console.log(err);
        this.merchRecord = [];
        this.loading = false;
        this.totalAmount = 0;
        this.totalBottles = 0;
        this.userService.generalToastSh(err.error.msg);
      } 
    );
  }
}
