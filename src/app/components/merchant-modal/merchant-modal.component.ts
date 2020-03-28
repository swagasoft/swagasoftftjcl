import { NgForm } from '@angular/forms';
import { DistributionService } from './../../shared/distribution.service';
import { OutletService } from './../../shared/outlet.service';
import { Component, OnInit, APP_BOOTSTRAP_LISTENER, OnDestroy } from '@angular/core';
import { UserServiceService } from 'src/app/shared/user-service.service';
import { NavController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-merchant-modal',
  templateUrl: './merchant-modal.component.html',
  styleUrls: ['./merchant-modal.component.scss'],
})
export class MerchantModalComponent implements OnInit, OnDestroy {
loading = true; allOutlet: any;  allMerchant: any;
admin: any; singleOutlet: any; saleRecords : any;


  constructor(public userService: UserServiceService,
              public outletService: OutletService,
              public distService : DistributionService,
              public navCtrl: NavController, public modalController: ModalController) { 
                this.getAllOutlets();
                this.getAllMerchant();
              }

              
model = {
  admin:'', outletCode : '', outletName:'', outletRate: 0,
  amountSold: null, bottleSold : null, merchant: []
}

  ngOnInit() {
    this.admin = localStorage.getItem('appUser');
  }

  ngOnDestroy(){
    this.model = {
      admin:'', outletCode : '', outletName:'', outletRate: 0,
      amountSold: null, bottleSold : null, merchant: []
    }
    this.allOutlet = [];  this.allMerchant = [];
    this.singleOutlet = [] ;
  }




  submitForm(form: NgForm){
    console.log(form.value);
    this.loading = true;
    this.model.amountSold = this.model.outletRate * this.model.bottleSold;
    this.model.merchant.forEach((user)=> {
    let  myRecord = {
        admin : this.admin,
        merchantName : user,
        attendant: this.model.merchant.length,
        outletCode: this.model.outletCode,
        bottles: this.model.bottleSold /this.model.merchant.length,
        date: Date.now(),
        amountSold : this.model.outletRate * this.model.bottleSold / this.model.merchant.length,
      }

    this.outletService.submitMerchantRecord(myRecord).subscribe(
        res => {
          console.log(res);
          this.loading = false;
          
          this.closeModal();
          this.userService.generalToastSh(res['msg']);
        },
        err => {
          this.loading = false;
          console.log(err);
          this.userService.generalToast(err.error.msg);
        }
      );
    });
  }

  selectedVal(event){
    console.log(event);
    console.log(event.detail.value);
    this.model.merchant.push(event.detail.value);
  }

  deleteMerchant(){
    this.model.merchant.pop();
  }

  closeModal(){
    this.navCtrl.pop();
    this.modalController.dismiss();
    console.log('i clicked close');
  } 

  getAllMerchant(){
    this.loading = true;
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

  getAllOutlets(){
    this.loading = true;
    this.outletService.findAlloutlets().subscribe(
      res => {
        this.loading = false; this.allOutlet = res;
        console.log(this.allOutlet);
        
      },
      err => {
        this.loading = false; this.userService.generalToast(err.error['msg']);
        console.log(err);
      }
    );
  }

  selectOutlet(event){
    console.log(event.target.value);
    const outletId = event.target.value;
    this.loading = true;
    this.distService.findOutlet(outletId).subscribe(
      res => {
        this.loading = false;
        this.singleOutlet = res['outlet'];
        this.model.outletCode = res['outlet']['code'];
        this.model.outletRate = res['outlet']['merchant_rate'];
        console.log(res);
        console.log(this.model.outletCode);
        console.log(this.model.outletRate);
      },
      err => {
        this.loading = false;
        console.log(err);
      }
    );
    
  }
}


