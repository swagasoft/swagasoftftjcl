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
specifieldmerchant: any;
dateModel;


  constructor(public userService: UserServiceService,
              public outletService: OutletService,
              public distService : DistributionService,
              public navCtrl: NavController, public modalController: ModalController) { 
                this.getAllOutlets();
              }

              
model = {
  admin:'', outletCode : '', outletName:'', outletRate: 0,
  amountSold: null, bottleSold : null, merchant: [], date:Date.now()
} 

  ngOnInit() {
    this.admin = localStorage.getItem('appUser');
  }

  ngOnDestroy(){
    this.dateModel = Date.now();
    this.model = {
      admin:'', outletCode : '', outletName:'', outletRate: 0,
      amountSold: null, bottleSold : null, merchant: [], date:Date.now()
    }
    this.allOutlet = [];  this.specifieldmerchant = [];
    this.singleOutlet = [] ;
  }



  dateChange(event){
    console.log(event.detail.value)
    console.log( this.dateModel)
    this.dateModel = event.detail.value;
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
        date: this.dateModel,
        rate : this.model.outletRate,
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
    // this.navCtrl.pop();
    this.modalController.dismiss();
    console.log('i clicked close');
  } 

  // getAllMerchant(){
  //   this.loading = true;
  //   this.outletService.getAllMercahnt().subscribe(
  //     res => {
  //       this.loading = false;
  //       this.allMerchant = res['merchant'];
  //       console.log(this.allMerchant);

  //     },
  //     err => {
  //       this.loading = false;
  //       this.userService.generalToast(err.error.msg);
  //       console.log(err);
  //     }
  //   );
  // }

  getAllOutlets(){
    this.loading = true;
    this.outletService.getOutletForSupply().subscribe(
      res => {
        this.loading = false; this.allOutlet = res['outlets'];
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
    this.specifieldmerchant = [];
    const outletId = event.target.value;
    this.loading = true;
    this.distService.findOutlet(outletId).subscribe(
      res => {
        this.loading = false;
        this.singleOutlet = res['outlet'];
        this.model.outletCode = res['outlet']['code'];
        this.model.outletRate = res['outlet']['merchant_rate'];
        this.specifieldmerchant = res['merchant'];
       
      },
      err => {
        this.loading = false;
        console.log(err);
      }
    );
    
  }
}


