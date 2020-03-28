import { DistributionService } from './../../shared/distribution.service';
import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { UserServiceService } from 'src/app/shared/user-service.service';

@Component({
  selector: 'app-edit-production',
  templateUrl: './edit-production.component.html',
  styleUrls: ['./edit-production.component.scss'],
})
export class EditProductionComponent implements OnInit {
loading = false;
  constructor(public navParams: NavParams,
    public userService: UserServiceService ,
    private distService: DistributionService,
    public modalController: ModalController) { }
    model = {
      pineapple: null,
      orange :  null,
      watermelon: null,
      tigernut: null,
      carrot : null,
      sugarcane : null,
      admin: localStorage.getItem('appUser'),
      slg : null,
      date: Date.now(),
      id:null
    }
  
  ngOnInit() {
    this.model.id = this.navParams.get('id');
    this.model.pineapple = this.navParams.get('prod_p');
    this.model.orange = this.navParams.get('prod_o');
    this.model.watermelon = this.navParams.get('prod_w');
    this.model.tigernut = this.navParams.get('prod_t');
    this.model.carrot = this.navParams.get('prod_c');
    this.model.sugarcane = this.navParams.get('prod_s');
    this.model.slg = this.navParams.get('prod_slg');
    console.log(this.model.id);
  }

  resetProd(){
    this.model = {
      pineapple: null,
      orange :  null,
      watermelon: null,
      tigernut: null,
      carrot : null,
      sugarcane : null,
      admin: localStorage.getItem('appUser'),
      slg : null,
      id:null,
      date: null
    }
  }

  closeModal(){
    this.modalController.dismiss();
  }


  submitProd(){
    this.loading = true;
    console.log(this.model);
    this.distService.editProduction(this.model).subscribe(
      res => {
        this.loading = false;
        this.userService.generalToastSh(res['msg']);
        this.closeModal();
      },
      err => {
        this.loading = false;
        this.userService.generalToastSh(err.error.msg);
      }
    )
  }

} 
