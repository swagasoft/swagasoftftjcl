import { OutletService } from 'src/app/shared/outlet.service';
import { DistributionService } from 'src/app/shared/distribution.service';
import { UserServiceService } from 'src/app/shared/user-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-supply-record',
  templateUrl: './supply-record.component.html',
  styleUrls: ['./supply-record.component.scss'],
})
export class SupplyRecordComponent implements OnInit {
loading = false;
allOutlet: any;
selectedOutlet: any;

total_p = 0;
total_o = 0;
total_w = 0;
total_t = 0;
total_c = 0;
total_s = 0;
total_slg = 0;

p_sample = 0;
o_sample = 0;
w_sample = 0;
t_sample = 0;
c_sample = 0;
s_sample = 0;
slg_sample = 0;

p_exchange = 0;
o_exchange = 0;
w_exchange = 0;
t_exchange = 0;
c_exchange = 0;
s_exchange = 0;
slg_exchange = 0;

p_return = 0;
o_return = 0;
w_return = 0;
t_return = 0;
c_return = 0;
s_return = 0;
slg_return = 0;

  constructor(public userService:UserServiceService, 
              private outletService: OutletService,
               private distService: DistributionService) { }

  
searchModel = { 
  outletCode: '', month: null, year : null
  };
  ngOnInit() {
    this.getAllOutlets();
  } 

  thisMonthRecord(event){
console.log(event);
this.searchModel.month = event.next.month;
this.searchModel.year = event.next.year;
this.searchByMonth();
  }

  selectOutlet(event){
    // set all value = 0;
    this.total_p = 0;
    this.total_o = 0;
    this.total_w = 0;
    this.total_t = 0;
    this.total_c = 0;
    this.total_s = 0;
    this.total_slg = 0;

      this.p_sample = 0;
      this.o_sample = 0;
      this.w_sample = 0;
      this.t_sample = 0;
      this.c_sample = 0;
      this.s_sample = 0;
      this.slg_sample = 0;

      this.p_exchange = 0;
      this.o_exchange = 0;
      this.w_exchange = 0;
      this.t_exchange = 0;
      this.c_exchange = 0;
      this.s_exchange = 0;
      this.slg_exchange = 0;

      this.p_return = 0;
      this.o_return = 0;
      this.w_return = 0;
      this.t_return = 0;
      this.c_return = 0;
      this.s_return = 0;
      this.slg_return = 0;


    // console.log(event.target.value);
    this.searchModel.outletCode = event.target.value;

    this.loading = true;
    this.distService.getOutletSupplies(this.searchModel).subscribe(
      res => {
        this.loading = false;
        this.selectedOutlet = res['record'];
        console.log(this.selectedOutlet);
        this.selectedOutlet.forEach((element)=> {
         
          this.total_p +=  element.pineapple;
          this.total_o +=  element.orange;
          this.total_c +=  element.carrot;
          this.total_w +=  element.watermelon;
          this.total_t +=  element.tigernut;
          this.total_s +=  element.sugarcane;
          this.total_slg +=  element.slg;
          // sum samples
          this.p_sample += element.p_samp;
          this.o_sample += element.o_samp;
          this.w_sample += element.w_samp;
          this.t_sample += element.t_samp;
          this.c_sample += element.c_samp;
          this.s_sample += element.s_samp;
          this.slg_sample += element.slg_samp;
          // sum return
          this.p_return += element.p_return;
          this.o_return += element.o_return;
          this.w_return += element.w_return;
          this.t_return += element.t_return;
          this.c_return += element.c_return;
          this.c_return += element.c_return;
          this.s_return += element.s_return;
          this.slg_return += element.slg_return;
          // sum exchange
          console.log(element.p_exg, typeof(element.pineapple));
          this.p_exchange += element.p_exg;
          this.o_exchange += element.o_exg;
          this.w_exchange += element.w_exg;
          this.t_exchange += element.t_exg;
          this.c_exchange += element.c_exg;
          this.s_exchange += element.s_exg;
          this.slg_exchange += element.slg_exg;
        })
      },
      err => {
        this.loading = false;
        console.log(err);
        this.selectedOutlet = [];
        this.userService.generalToastSh(err.error.msg);
      }
    );
    
  }

  searchByMonth(){
    this.total_p = 0;
    this.total_o = 0;
    this.total_w = 0;
    this.total_t = 0;
    this.total_c = 0;
    this.total_s = 0;
    this.total_slg = 0;

      this.p_sample = 0;
      this.o_sample = 0;
      this.w_sample = 0;
      this.t_sample = 0;
      this.c_sample = 0;
      this.s_sample = 0;
      this.slg_sample = 0;

      this.p_exchange = 0;
      this.o_exchange = 0;
      this.w_exchange = 0;
      this.t_exchange = 0;
      this.c_exchange = 0;
      this.s_exchange = 0;
      this.slg_exchange = 0;

      this.p_return = 0;
      this.o_return = 0;
      this.w_return = 0;
      this.t_return = 0;
      this.c_return = 0;
      this.s_return = 0;
      this.slg_return = 0;
    this.loading = true;
    this.distService.getOutletSupplies(this.searchModel).subscribe(
      res => {
        this.loading = false;
        this.selectedOutlet = res['record'];
        console.log(this.selectedOutlet);
        this.selectedOutlet.forEach((element)=> {
         
          this.total_p +=  element.pineapple;
          this.total_o +=  element.orange;
          this.total_c +=  element.carrot;
          this.total_w +=  element.watermelon;
          this.total_t +=  element.tigernut;
          this.total_s +=  element.sugarcane;
          this.total_slg +=  element.slg;
          // sum samples
          this.p_sample += element.p_samp;
          this.o_sample += element.o_samp;
          this.w_sample += element.w_samp;
          this.t_sample += element.t_samp;
          this.c_sample += element.c_samp;
          this.s_sample += element.s_samp;
          this.slg_sample += element.slg_samp;
          // sum return
          this.p_return += element.p_return;
          this.o_return += element.o_return;
          this.w_return += element.w_return;
          this.t_return += element.t_return;
          this.c_return += element.c_return;
          this.c_return += element.c_return;
          this.s_return += element.s_return;
          this.slg_return += element.slg_return;
          // sum exchange
          console.log(element.p_exg, typeof(element.pineapple));
          this.p_exchange += element.p_exg;
          this.o_exchange += element.o_exg;
          this.w_exchange += element.w_exg;
          this.t_exchange += element.t_exg;
          this.c_exchange += element.c_exg;
          this.s_exchange += element.s_exg;
          this.slg_exchange += element.slg_exg;
        })
      },
      err => {
        this.loading = false;
        console.log(err);
        this.selectedOutlet = [];
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
}
