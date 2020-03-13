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
  allOutlet : any;
  loading = false;
  singleOutlet: any;
  admin: any;
  show = true;

  close() {
    this.show = false;
    setTimeout(() => this.show = true, 5000);
  }

  constructor(private outletService: OutletService,
              private distService: DistributionService,
              private router: Router,
              private userService: UserServiceService) { 
                this.getProdId();
                this.getAllOutlets();
                this.admin = localStorage.getItem('appUser');
                this.model.admin = this.admin;
              }

model = {
  pineapple: null,
  orange: null,
  watermelon: null,
  tigernut: null,
  carrot : null,
  sugarcane: null,
  slg : null,
  p_samp: 0,
  o_samp: 0,
  w_samp: 0,
  t_samp: 0,
  c_samp : 0,
  s_samp: 0,
  slg_samp : 0,
  outlet:'',
  axis:'',
  admin:'',
  fileId : ''
}





  ngOnInit() {
    this.model.admin = localStorage.getItem('appUser');
  }

  ngOnDestroy(){
    this.allOutlet = [];
    this.singleOutlet = [];
    this.model = {
      pineapple: null,
      orange: null,
      watermelon: null,
      tigernut: null,
      carrot : null,
      sugarcane: null,
      slg : null,
      p_samp: null,
      o_samp: null,
      w_samp: null,
      t_samp: null,
      c_samp : null,
      s_samp: null,
      slg_samp : null,
      outlet:'',
      axis:'',
      admin:'',
      fileId : ''
    }
  }

  submitForm(){
    console.log(this.model);
    this.loading = true;
    this.distService.supplyOutlet(this.model).subscribe(
      res => {
        console.log(res);
        this.loading = false;
        this.userService.generalToastSh(res['msg']);
        this.router.navigate(['/distributions']);
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
        this.model.axis = res['outlet']['axis'];
        console.log(res);
      },
      err => {
        this.loading = false;
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

  getProdId(){
    this.loading = true;
    this.distService.getProduction().subscribe(
      res => {
        this.loading = false;
        this.model.fileId = res['docs']['_id'];
      },
      err => {
        this.loading = false;
        console.log(err);
      }
    );
  }

}
