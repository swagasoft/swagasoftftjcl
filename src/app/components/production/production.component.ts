import { Router } from '@angular/router';
import { UserServiceService } from './../../shared/user-service.service';
import { DistributionService } from './../../shared/distribution.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-production',
  templateUrl: './production.component.html',
  styleUrls: ['./production.component.scss'],
})
export class ProductionComponent implements OnInit, OnDestroy {
loading = false;
  constructor(private distribute: DistributionService,
              private usrService: UserServiceService,
              private router: Router,
     public alertController: AlertController) { }

  model = {
    pineapple: null,
    orange :  null,
    watermelon: null,
    tigernut: null,
    carrot : null,
    sugarcane : null,
    slg : null
  }
  ngOnInit() {

  }
  ngOnDestroy(){
    this.resetProd();
  }

  submitProd(prod){
    console.log(this.model);
    this.confirmProd();
  }

  async confirmProd(){
    const alert = await this.alertController.create({
      header: 'CONFIRM PRODUCTION COUNT',
      message :`<p class="lead text-left">PINEAPPLE :${this.model.pineapple}</p>
               <p class="lead text-left">ORANGE : ${this.model.orange}</p>
               <p class="lead text-left">WATERMELON : ${this.model.watermelon}</p>
               <p class="lead text-left">TIGERNUT : ${this.model.tigernut}</p>
               <p class="lead text-left">CARROT : ${this.model.carrot}</p>
               <p class="lead text-left">SUGARCANE : ${this.model.sugarcane}</p>
               <p class="lead text-left">SLG : ${this.model.slg}</p>
               <p class="font-weight-bold text-center">TOTAL : ${this.model.pineapple + this.model.orange
                 + this.model.watermelon + this.model.tigernut + this.model.carrot + 
                this.model.sugarcane + this.model.slg}</p>`,

      buttons: [
        {
          text: 'CANCEL',
          role: 'cancel',
          cssClass: 'alertDanger',
          handler: (blah) => {
            console.log('cancel amount input');
          }
        }, {
          text: 'CONFIRM',
          cssClass : 'alertSuccess',
          handler: () => {
           console.log(this.model);
           this.loading = true;
           this.distribute.summitProduction(this.model).subscribe(
             res => {
               this.loading = false;
               console.log(res);
               this.usrService.generalToast(res['msg']);
               this.resetProd();
               this.router.navigateByUrl('/distributions');
             },
             err => {
               console.log(err);
               this.loading = false;
               this.usrService.generalToast(err.error.msg);
             }
           );
          }
        }
      ]
    });
    await alert.present();
  }

  resetProd(){
    this.model = {
      pineapple: null,
      orange :  null,
      watermelon: null,
      tigernut: null,
      carrot : null,
      sugarcane : null,
      slg : null
    }
  }
}
