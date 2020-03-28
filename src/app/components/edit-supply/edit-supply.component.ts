import { OutletService } from './../../shared/outlet.service';
import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { UserServiceService } from 'src/app/shared/user-service.service';
import { DistributionService } from 'src/app/shared/distribution.service';

@Component({
  selector: 'app-edit-supply',
  templateUrl: './edit-supply.component.html',
  styleUrls: ['./edit-supply.component.scss'],
})
export class EditSupplyComponent implements OnInit {
  allOutlet : any;
  singleOutlet: any;
  admin: any;
  loading = false;


  constructor(public navParams: NavParams,
    public userService: UserServiceService ,
    private outletService: OutletService,
    private distService: DistributionService,
    public modalController: ModalController) { 
      this.getAllOutlets();
      this.model.id = this.navParams.get('id');
      this.model.pineapple = this.navParams.get('pineapple');
      this.model.tigernut = this.navParams.get('tigernut');
      this.model.watermelon = this.navParams.get('watermelon');
      this.model.carrot = this.navParams.get('carrot');
      this.model.orange = this.navParams.get('orange');
      this.model.sugarcane = this.navParams.get('sugarcane');
      this.model.slg = this.navParams.get('slg');

      this.model.p_samp = this.navParams.get('p_samp');
      this.model.t_samp = this.navParams.get('t_samp');
      this.model.w_samp = this.navParams.get('w_samp');
      this.model.s_samp = this.navParams.get('s_samp');
      this.model.o_samp = this.navParams.get('o_samp');
      this.model.slg_samp = this.navParams.get('slg_samp');
      this.model.c_samp = this.navParams.get('c_samp');

      this.model.p_exg = this.navParams.get('p_exg');
      this.model.o_exg = this.navParams.get('o_exg');
      this.model.w_exg = this.navParams.get('w_exg');
      this.model.t_exg = this.navParams.get('t_exg');
      this.model.c_exg = this.navParams.get('c_exg');
      this.model.s_exg = this.navParams.get('s_exg');
      this.model.slg_exg = this.navParams.get('slg_exg');

      this.model.p_return = this.navParams.get('p_return');
      this.model.o_return = this.navParams.get('o_return');
      this.model.w_return = this.navParams.get('w_return');
      this.model.t_return = this.navParams.get('t_return');
      this.model.c_return = this.navParams.get('c_return');
      this.model.s_return = this.navParams.get('s_return');
      this.model.slg_return = this.navParams.get('slg_return');

      this.model.prod_id = this.navParams.get('prod_id');
      this.model.outlet = this.navParams.get('outlet');
      this.model.location = this.navParams.get('location');
      this.model.admin = localStorage.getItem('appUser')



    }


  model = {
    pineapple: 0, orange: 0, watermelon: 0, tigernut: 0,  carrot : 0, sugarcane: 0, slg : 0,
    p_samp: 0, o_samp: 0, w_samp: 0, t_samp: 0, c_samp : 0, s_samp: 0, slg_samp : 0,
    p_exg: 0, o_exg: 0, w_exg: 0, t_exg: 0, c_exg : 0, s_exg: 0, slg_exg : 0,
    p_return: 0, o_return: 0, w_return: 0, t_return: 0, c_return : 0, s_return: 0, slg_return : 0,
    outlet:'',
    location:'',
    admin:'',
    id:'',
    prod_id:''
  };
  ngOnInit() {}

  closeModal(){
    this.modalController.dismiss();
  }

  updateSupply(){
    console.log(this.model);
    this.loading = true;
    this.distService.updateSupply(this.model).subscribe(
      res=> {
        this.loading = false;
        this.userService.generalToastSh(res['msg']);
        this.closeModal();
      },
      err => {
        this.loading = false;
        this.userService.generalToastSh(err.error.msg);
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
        this.model.outlet = res['outlet']['code'];
        this.model.location = res['outlet']['location'];
        console.log(res);
      },
      err => {
        this.loading = false;
        console.log(err);
      }
    );
    
  }

}
