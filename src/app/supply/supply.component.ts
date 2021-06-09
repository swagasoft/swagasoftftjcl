import { Component, OnInit, OnDestroy } from '@angular/core';
import { OutletService } from '../shared/outlet.service';
import { DistributionService } from '../shared/distribution.service';
import { UserServiceService } from '../shared/user-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-supply',
  templateUrl: './supply.component.html',
  styleUrls: ['./supply.component.scss'],
})
export class SupplyComponent implements OnInit, OnDestroy {
  productionId: any;

  constructor(private outletService: OutletService,
              private distService: DistributionService,
              private router: Router,
              private userService: UserServiceService) { 
                
                this.admin = localStorage.getItem('appUser');
                this.model.admin = this.admin;
              }
  allOutlet : any;
  loading = false;
  singleOutlet: any;
  admin: any;
  show = true;

model = {
  pineapple: 0, orange: 0, watermelon: 0, tigernut: 0,  carrot : 0, sugarcane: 0, slg : 0,
  p_samp: 0, o_samp: 0, w_samp: 0, t_samp: 0, c_samp : 0, s_samp: 0, slg_samp : 0,
  p_exg: 0, o_exg: 0, w_exg: 0, t_exg: 0, c_exg : 0, s_exg: 0, slg_exg : 0,
  p_return: 0, o_return: 0, w_return: 0, t_return: 0, c_return : 0, s_return: 0, slg_return : 0,
  outlet:'',
  location:'',
  admin:'',
  fileId : '',
  rate_p:null, rate_o:null,rate_w:null, rate_t:null, 
  rate_c:null,rate_s:null, rate_slg:null, 
 

  date: Date.now()
};

  close() {
    this.show = false;
    setTimeout(() => this.show = true, 5000);
  }





  ngOnInit() {
    this.getProdId(); this.getAllOutlets();
    this.model.admin = localStorage.getItem('appUser');
  }

  ngOnDestroy(){
    this.allOutlet = [];
    this.singleOutlet = [];
    this.resetForm();
  }

  resetForm(){
    this.model = {
      pineapple: 0, orange: 0, watermelon: 0, tigernut: 0,  carrot : 0, sugarcane: 0, slg : 0,
      p_samp: 0, o_samp: 0, w_samp: 0, t_samp: 0, c_samp : 0, s_samp: 0, slg_samp : 0,
      p_exg: 0, o_exg: 0, w_exg: 0, t_exg: 0, c_exg : 0, s_exg: 0, slg_exg : 0,
      p_return: 0, o_return: 0, w_return: 0, t_return: 0, c_return : 0, s_return: 0, slg_return : 0,
      outlet:'',
      location:'',
      admin: localStorage.getItem('appUser'),
      fileId : this.productionId, rate_p:null, rate_o:null,rate_w:null, rate_t:null, 
      rate_c:null,rate_s:null, rate_slg:null, 
      date: Date.now()
    };
  }

  submitForm(){
    console.log(this.model);
    this.loading = true;
    this.model.date = Date.now();
    this.distService.supplyOutlet(this.model).subscribe(
      res => {
        console.log(res);
        this.loading = false;
        this.resetForm();
        this.userService.generalToastSh(res['msg']);
        this.router.navigate(['/tabs/distributions']);
      },
      err => {
        this.loading = false;
        console.log(err);
        this.userService.generalToast(err.error.msg);
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
        console.log(this.singleOutlet);
        this.model.rate_p = this.singleOutlet.p_price;
        this.model.rate_o = this.singleOutlet.o_price;
        this.model.rate_w = this.singleOutlet.w_price;
        this.model.rate_t = this.singleOutlet.t_price;
        this.model.rate_c = this.singleOutlet.c_price;
        this.model.rate_s = this.singleOutlet.s_price;
        this.model.rate_slg = this.singleOutlet.slg_price;
      },
      err => {
        this.loading = false;
        console.log(err);
      }
    );
    
  }

  getAllOutlets(){
    this.loading = true;
    this.outletService.getOutletForSupply().subscribe(
      res => {
        this.loading = false; this.allOutlet = res ['outlets'];
        console.log(this.allOutlet);
        
      },
      err => {
        this.loading = false; this.userService.generalToast(err.error['msg']);
        console.log(err);
      }
    );
  }

  getProdId(){
    this.loading = true;
    this.distService.getProduction().subscribe(
      res => {
        this.loading = false;
        this.model.fileId = res['docs']['_id'];
        this.productionId = res['docs']['_id'];
      },
      err => {
        this.loading = false;
        console.log(err);
      }
    );
  }

}
