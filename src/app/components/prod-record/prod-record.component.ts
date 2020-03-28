import { UserServiceService } from 'src/app/shared/user-service.service';
import { DistributionService } from 'src/app/shared/distribution.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonRefresher } from '@ionic/angular';

@Component({
  selector: 'app-prod-record',
  templateUrl: './prod-record.component.html',
  styleUrls: ['./prod-record.component.scss'],
})
export class ProdRecordComponent implements OnInit {
loading = false;
Calmodel;
prod_list = [];
totalProd_p = 0;
totalProd_o = 0;
totalProd_w = 0;
totalProd_t = 0;
totalProd_c = 0;
totalProd_s = 0;
totalProd_slg = 0;

totalSup_p = 0;
totalSup_o = 0;
totalSup_w = 0;
totalSup_t = 0;
totalSup_c = 0;
totalSup_s = 0;
totalSup_slg = 0;


totalSupply = 0;

  constructor(private distService: DistributionService, public userService:UserServiceService) { }
  @ViewChild('refresherRef', {static : false}) refresherRef: IonRefresher;
  searchModel = { 
    outletCode: '', month: null, year : null
    };

    searchDayModel = {
      day:null, month:null, year:null
    }
  ngOnInit() {}

  thisMonthRecord(event){
    this.prod_list = [];
    this.loading = true;
    this.totalProd_p = 0; 
        this.totalProd_o = 0;
        this.totalProd_c = 0;
        this.totalProd_w = 0;
        this.totalProd_t = 0;
        this.totalProd_s = 0;
        this.totalProd_slg = 0;
        
        this.totalSup_p = 0;
        this.totalSup_o = 0;
        this.totalSup_c = 0;
        this.totalSup_w = 0;
        this.totalSup_t = 0;
        this.totalSup_s = 0;
        this.totalSup_slg = 0;
    console.log(event);
    this.searchModel.month = event.next.month;
    this.searchModel.year = event.next.year;
    this.distService.productionList(this.searchModel).subscribe(
      res => {
        this.loading = false;
        this.prod_list = res['record'];
        console.log(res);
        this.prod_list.forEach((record)=> {
          this.totalProd_p += record.prod_p; 
          this.totalProd_o += record.prod_o;
          this.totalProd_c += record.prod_c;
          this.totalProd_w += record.prod_w;
          this.totalProd_t += record.prod_t;
          this.totalProd_s += record.prod_s;
          this.totalProd_slg += record.prod_slg;

          this.totalSup_p += record.sup_p;
          this.totalSup_o += record.sup_o;
          this.totalSup_c += record.sup_c;
          this.totalSup_w += record.sup_w;
          this.totalSup_t += record.sup_t;
          this.totalSup_s += record.sup_s;
          this.totalSup_slg += record.sup_slg;
        });
       
      },
      err => {
        this.loading = false;
        this.prod_list = [];
        this.userService.generalToastSh(err.error.msg);
        console.log(err);
      }
    );
      }

      doRefresh(event){
        this.prod_list = [];
        this.loading = true;
        this.totalProd_p = 0; 
        this.totalProd_o = 0;
        this.totalProd_c = 0;
        this.totalProd_w = 0;
        this.totalProd_t = 0;
        this.totalProd_s = 0;
        this.totalProd_slg = 0;
        
        this.totalSup_p = 0;
        this.totalSup_o = 0;
        this.totalSup_c = 0;
        this.totalSup_w = 0;
        this.totalSup_t = 0;
        this.totalSup_s = 0;
        this.totalSup_slg = 0;
        
        this.distService.productionList(this.searchModel).subscribe(
          res => {
            this.loading = false;
            this.prod_list = res['record'];
            this.refresherRef.complete();
            this.prod_list.forEach((record)=> {
              this.totalProd_p += record.prod_p; 
              this.totalProd_o += record.prod_o;
              this.totalProd_c += record.prod_c;
              this.totalProd_w += record.prod_w;
              this.totalProd_t += record.prod_t;
              this.totalProd_s += record.prod_s;
              this.totalProd_slg += record.prod_slg;
    
              this.totalSup_p += record.sup_p;
              this.totalSup_o += record.sup_o;
              this.totalSup_c += record.sup_c;
              this.totalSup_w += record.sup_w;
              this.totalSup_t += record.sup_t;
              this.totalSup_s += record.sup_s;
              this.totalSup_slg += record.sup_slg;
            });
            console.log(res);
          },
          err => {
            this.loading = false;
            this.prod_list = [];
            this.refresherRef.complete();
            this.userService.generalToastSh(err.error.msg);
            console.log(err);
          }
        );
      }

      submitDate(event){
        console.log(event)
        this.prod_list = [];
        this.loading = true;
        this.totalProd_p = 0; 
        this.totalProd_o = 0;
        this.totalProd_c = 0;
        this.totalProd_w = 0;
        this.totalProd_t = 0;
        this.totalProd_s = 0;
        this.totalProd_slg = 0;
        
        this.totalSup_p = 0;
        this.totalSup_o = 0;
        this.totalSup_c = 0;
        this.totalSup_w = 0;
        this.totalSup_t = 0;
        this.totalSup_s = 0;
        this.totalSup_slg = 0;
        this.loading = true;
        this.searchDayModel.day = event.value.dp.day;
        this.searchDayModel.month = event.value.dp.month;
        this.searchDayModel.year = event.value.dp.year;
        this.distService.getProdByDate(this.searchDayModel).subscribe(
          res => {
            this.loading = false;
            this.prod_list = res['record'];
            this.prod_list.forEach((record)=> {
              this.totalProd_p += record.prod_p; 
              this.totalProd_o += record.prod_o;
              this.totalProd_c += record.prod_c;
              this.totalProd_w += record.prod_w;
              this.totalProd_t += record.prod_t;
              this.totalProd_s += record.prod_s;
              this.totalProd_slg += record.prod_slg;
    
              this.totalSup_p += record.sup_p;
              this.totalSup_o += record.sup_o;
              this.totalSup_c += record.sup_c;
              this.totalSup_w += record.sup_w;
              this.totalSup_t += record.sup_t;
              this.totalSup_s += record.sup_s;
              this.totalSup_slg += record.sup_slg;
            });
            console.log(res);
          },
          err => {
            this.loading = false;
            this.prod_list = [];
            this.userService.generalToastSh(err.error.msg);
          }
        );
      }
      
}
