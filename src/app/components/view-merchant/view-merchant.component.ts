import { Component, OnInit } from '@angular/core';
import { UserServiceService } from 'src/app/shared/user-service.service';
import { OutletService } from 'src/app/shared/outlet.service';
import { ModalController, AlertController } from '@ionic/angular';
import { RecordService } from 'src/app/shared/record.service';
import { NgbDatepickerNavigateEvent } from '@ng-bootstrap/ng-bootstrap';

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

  constructor(public userService: UserServiceService, 
    
              public outletService: OutletService,
              public modalController: ModalController,
              public alertController: AlertController,
              private recordService: RecordService) {
                this.getAllMerchant();
               }

  model = {
    merchant:''
  }
  searchModel = {
    month: null,
    year : null,
    fullname : null

  }

  ngOnInit() {}

  getAllMerchant(){
    this.outletService.getAllMercahnt().subscribe(
      res => {
        this.loading = false;
        this.allMerchant = res['merchant'];
        console.log(this.allMerchant);

      },
      err => {
        this.loading = false;
        this.userService.generalToast(err.error.msg);
        console.log(err);
      }
    );
  }

  selectedVal(event){
    this.totalAmount = 0;
    this.totalBottles = 0;
    this.model.merchant = event.detail.value;
    this.searchModel.fullname = event.detail.value;
    console.log(this.model.merchant);
    this.loading = true;
    this.outletService.getMerchantRecord(this.model).subscribe(
      res => {
        this.loading = false;
        console.log(res);
        this.merchRecord = res['merchant'];
        this.presence = this.merchRecord.length;
        this.merchRecord.forEach((record)=> {
          this.totalBottles += record.bottles;
          this.totalAmount += record.amountSold;
        })
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
