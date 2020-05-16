import { MerchantComponent } from './../merchant/merchant.component';
import { Component, OnInit } from '@angular/core';
import { UserServiceService } from 'src/app/shared/user-service.service';
import { OutletService } from 'src/app/shared/outlet.service';
import { ModalController, AlertController } from '@ionic/angular';
import { NgbDatepickerNavigateEvent } from '@ng-bootstrap/ng-bootstrap';
import { DistributionService } from 'src/app/shared/distribution.service';

@Component({
  selector: 'app-view-by-outlet',
  templateUrl: './view-by-outlet.component.html',
  styleUrls: ['./view-by-outlet.component.scss'],
})
export class ViewByOutletComponent implements OnInit {
loading = false;
allOutlet : any;
  singleOutlet: any;
  admin: any;
  outletSales: any;
  amountSold = 0;
  bottles = 0;

  constructor(public userService: UserServiceService, 
              public outletService: OutletService,
              private distService: DistributionService,
              public modalController: ModalController,
              public alertController: AlertController,) { }
  searchModel = {
    month: null,
    year : null,
    fullname : null,
    MerchantCode:''

  }
  ngOnInit() {
    this.getAllOutlets();
  }
  theMonthNavigate($event: NgbDatepickerNavigateEvent) {
    this.amountSold = 0;
    this.bottles = 0;
    this.outletSales = null;
    this.searchModel.month = $event.next.month;
    this.searchModel.year = $event.next.year;
    this.outletService.findOutletSaleByCode(this.searchModel).subscribe(
      res => {
        this.loading = false;
        console.log(res);
        this.outletSales = res['record'];
        this.outletSales.forEach(element => {
          this.bottles += element.bottles;
          this.amountSold += element.amountSold;
        });
      },
      err => {
        this.loading = false;
        console.log(err);
        this.userService.generalToastSh(err.error.msg);
      }
    );
   
  }

  selectOutlet(event){
    this.amountSold = 0;
    this.bottles = 0;
    this.outletSales = null;
    console.log(event.target.value);
   this.searchModel.MerchantCode = event.target.value;
    this.loading = true;
    this.outletService.findOutletSaleByCode(this.searchModel).subscribe(
      res => {
        this.loading = false;
        console.log(res);
        this.outletSales = res['record'];
        this.outletSales.forEach(element => {
          this.bottles += element.bottles;
          this.amountSold += element.amountSold;
        });
      },
      err => {
        this.loading = false;
        console.log(err);
        this.userService.generalToastSh(err.error.msg);
      }
    );
  
    
  }


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

}
