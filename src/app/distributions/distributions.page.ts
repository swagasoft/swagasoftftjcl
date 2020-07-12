import { EditSupplyComponent } from './../components/edit-supply/edit-supply.component';
import { EditBadStockComponent } from './../components/edit-bad-stock/edit-bad-stock.component';
import { EditProductionComponent } from './../components/edit-production/edit-production.component';
import { ExchangeModalComponent } from './../components/exchange-modal/exchange-modal.component';
import { ReturnModalComponent } from './../components/return-modal/return-modal.component';
import { DistributionService } from './../shared/distribution.service';
import { UserServiceService } from './../shared/user-service.service';
import { OutletService } from './../shared/outlet.service';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { IonRefresher, AlertController, ModalController } from '@ionic/angular';

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
              public modalController: ModalController,
              public userService: UserServiceService) {
                userService.getUserRole();
                userService.isLogedIn();
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
    admin:'',
    id:null,
    date: Date.now
  };

  ngOnInit() {
    this.getProduction();
    this.model.admin = localStorage.getItem('appUser')
  }

  confirmProd(id){
    this.distService.confirmProd(id).subscribe(
      res=> {
        // this.userService.generalToastSh(res['msg']);
        this.getProduction();
      }
    );
  }
  unconfirmProd(id){
    this.distService.unConfirmProd(id).subscribe(
      res=> {
        // this.userService.generalToastSh(res['msg']);
        this.getProduction();
      }
    );
  }

  async editProduction(id,prod_p, prod_o,prod_w,prod_t,prod_c,prod_s,prod_slg) {
      console.log();
      const modal = await this.modalController.create({
    component: EditProductionComponent,
    componentProps: {
      'id': id,
      'prod_p':  prod_p,
      'prod_o': prod_o,
      'prod_w': prod_w,
      'prod_t': prod_t,
      'prod_c': prod_c,
      'prod_s': prod_s,
      'prod_slg':prod_slg
    }} );
      modal.onDidDismiss().then(() => {
          this.getProduction();
  });
      return await modal.present();
  }


  async editBadStock(id,bad_p, bad_o,bad_w,bad_t,bad_c,bad_s,bad_slg) {
    const modal = await this.modalController.create({
  component: EditBadStockComponent,
  componentProps: {
    'id': id,
    'bad_p':  bad_p,
    'bad_o': bad_o,
    'bad_t': bad_t,
    'bad_w': bad_w,
    'bad_c': bad_c,
    'bad_s': bad_s,
    'bad_slg':bad_slg
  }} );
    modal.onDidDismiss().then(() => {
        this.getProduction();
});
    return await modal.present();
}


async editSupply(id,pineapple,tigernut,watermelon,carrot, orange,sugarcane, slg,
   p_samp,c_samp, t_samp, w_samp, s_samp, o_samp, slg_samp,
    p_exg, o_exg, w_exg, t_exg, c_exg, s_exg, slg_exg,
     p_return, o_return, w_return, t_return, c_return, s_return, slg_return,
      prod_id, outlet, location) {
  const modal = await this.modalController.create({
component: EditSupplyComponent,
componentProps: {
  'id': id,'pineapple':  pineapple, 'tigernut': tigernut,'watermelon': watermelon,'carrot': carrot,
  'orange': orange,'sugarcane': sugarcane,'slg':slg,
  'p_samp':p_samp,'t_samp':t_samp,'w_samp':w_samp,'s_samp':s_samp,'o_samp':o_samp,'slg_samp':slg_samp,
  'c_samp':c_samp,
  'p_exg':p_exg,'o_exg':o_exg,'w_exg':w_exg,'t_exg':t_exg,'c_exg':c_exg,'s_exg':s_exg,'slg_exg':slg_exg,
  'p_return':p_return,'o_return':o_return,'w_return':w_return,'t_return':t_return,'c_return':c_return,
  's_return':s_return,'slg_return':slg_return,'prod_id':prod_id,'outlet':outlet,'location':location
}} );
  modal.onDidDismiss().then(() => {
      this.getProduction();
});
  return await modal.present();
}

  ngOnDestroy(){
    this.products = [];
    this.allOutlet = [];
    this.supplies= [];
    this.productName = [];
    this.model = {
      bad_p : 0,
      bad_o : 0,
      bad_w : 0,
      bad_t: 0,
      bad_c: 0,
      bad_s : 0,
      bad_slg : 0,
      admin: localStorage.getItem('appUser'),
      id:null,
      date: Date.now
    };
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
                  let message = (err.error.msg) ? err.error.msg : 'Internet connnection failed!';
                  this.userService.generalToast(message);
                }
              );
        
          }
        }
      ]
    });
    await alert.present();
  }

  confirmSupply(id){
    this.distService.confirmSupply(id).subscribe(
      res => {
        console.log(res);
        this.getProduction();
        this.userService.generalToastSh(res['msg']);
      }
    );
  }
  unConfirmSupply(id){
    this.distService.unConfirmSupply(id).subscribe(
      res => {
        this.getProduction();
        // this.userService.generalToastSh(res['msg']);
        console.log();
      }
    )
  }
  verifySupply(id){
    console.log(id);
    this.distService.verifySupply(id).subscribe(
      res => {
        this.getProduction();
         this.userService.generalToastSh(res['msg']);
        console.log(res);
      }
    )
  }
  unverifySupply(id){
    this.distService.unVerifySupply(id).subscribe(
      res => {
        this.getProduction();
        console.log(res);
      }
    );
  }

  getProduction(){
    this.distService.getProduction().subscribe(
      res => {
        this.products = res['docs'];
        this.productName = res['docs']['products'];
        this.loading = false;
        this.model.id = res['docs']['_id'];
        this.supplies = res['supplies'];
        console.log(this.supplies)
        this.refresherRef.complete();
        // console.log(this.supplies);

      },
      err => {
        console.log(err);
        this.products =null;
        this.loading = false;
        let message = (err.error.msg) ? err.error.msg : 'Internet connnection failed!';
        this.userService.generalToast(message);
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

  cancelBadStockForm(){
    this.showbadStockForm = false;
    this.resetBadStockForm();
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
        this.resetBadStockForm();
      },
      err => {
        this.loading = false;
        this.userService.generalToast(err.error.msg);
        console.log(err);
      }
    );
  }

  resetBadStockForm(){
    this.model = {
      bad_p : 0,
      bad_o : 0,
      bad_w : 0,
      bad_t: 0,
      bad_c: 0,
      bad_s : 0,
      bad_slg : 0,
      admin:'',
      id:null,
      date: Date.now
    };
  }

  async returnStock() {
 const modal = await this.modalController.create({
   component: ReturnModalComponent,
 });
 modal.onDidDismiss().then(()=> {
   this.getProduction();
 });
 return await modal.present();
 
} 

async exchangeStock() {
 const modal = await this.modalController.create({
   component: ExchangeModalComponent,
 });
 modal.onDidDismiss().then(()=> {
console.log('modal is dismiss');
this.getProduction();
 });
 return await modal.present();
}

 

}
