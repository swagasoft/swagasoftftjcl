import { DistributionService } from './../shared/distribution.service';
import { UserServiceService } from './../shared/user-service.service';
import { OutletService } from './../shared/outlet.service';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { IonRefresher, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-distributions',
  templateUrl: './distributions.page.html',
  styleUrls: ['./distributions.page.scss'],
})
export class DistributionsPage implements OnInit, OnDestroy {
  @ViewChild('refresherRef', {static : false}) refresherRef: IonRefresher; 
  constructor(
              private distService: DistributionService,
              public alertController: AlertController,
              private userService: UserServiceService) {
         this.getProduction();
   }

allOutlet : any;
loading = true;
products : any;
productName : any;
showbadStockForm = false;
supplies: any;

  model = {
    bad_p : 0,
    bad_o : 0,
    bad_w : 0,
    bad_t: 0,
    bad_c: 0,
    bad_s : 0,
    bad_slg : 0,
    id:null
  };

  ngOnInit() {
  }

  ngOnDestroy(){
    this.products = [];
    this.allOutlet = null;
  }

  doRefresh(event){
    this.loading = true;
      this.getProduction();
      this.loading = false;
  }

  async closeRecord(id){
    const alert = await this.alertController.create({
      header: 'ARE YOU SURE YOU WANT CLOSE THIS RECORD?',
      message :`if close, cannot submit any more supply on this record! `,
      buttons: [
        {
          text: 'CANCEL',
          role: 'cancel',
          cssClass: 'danger',
          handler: (blah) => {
            console.log('cancel amount input');
          }
        }, {
          text: 'CONFIRM',
          cssClass : 'danger',
          handler: () => {
            console.log(id);
            this.loading = true;
            this.distService.closeRecord(id).subscribe(
              res => {
                this.loading = false;
                this.userService.generalToastSh(res['msg']);
                this.getProduction();
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
 

  getProduction(){
    this.distService.getProduction().subscribe(
      res => {
        this.products = res['docs'];
        this.productName = res['docs']['products'];
        this.loading = false;
        this.model.id = res['docs']['_id'];
        this.supplies = res['supplies'];
        this.refresherRef.complete();
        console.log(this.supplies);

      },
      err => {
        console.log(err);
        this.products =null;
        this.loading = false;
        this.userService.generalToast(err.error.msg);
        this.refresherRef.complete();

      }
    );
  }

  selectOutlet(event){
    console.log(event.target.value);
    const outletId = event.target.value;
    // this.outletService.findOutletProperties(outletId)
  }

  badStockForm(){
    this.showbadStockForm = true;
  }

  sunmitBadstock(){
    this.loading = true;
    console.log(this.model);
    this.distService.submitbadStock(this.model).subscribe(
      res => {
        console.log(res);
        this.loading = false;
        this.showbadStockForm = false;
        this.userService.generalToastSh(res['msg']);
        this.getProduction();
      },
      err => {
        this.loading = false;
        this.userService.generalToast(err.error.msg);
        console.log(err);
      }
    );
  }

}
