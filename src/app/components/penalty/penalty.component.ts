import { UserServiceService } from './../../shared/user-service.service';
import { ViewPenaltyComponent } from './../view-penalty/view-penalty.component';
import { Penalty } from './../../interfaces/penalty';

import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { IonRefresher, AlertController, IonInfiniteScroll, ModalController } from '@ionic/angular';
import { StaffService } from 'src/app/shared/staff.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-penalty',
  templateUrl: './penalty.component.html',
  styleUrls: ['./penalty.component.scss'],
})
export class PenaltyComponent implements OnInit{
  @ViewChild('refresherRef', {static : false}) refresherRef: IonRefresher;
  @ViewChild(IonInfiniteScroll, {static : false}) infiniteScroll: IonInfiniteScroll;
 
  loading = true;
  model;
  myDate  = new Date();
  penalize : Penalty[] = [];

searchModel = { 
  search: '',fullname: '', month: null, year : null
  };
  


    constructor(public staffService: StaffService,public alertController: AlertController,
                public userService: UserServiceService, private modalController : ModalController) {
                  let appMonth = new Date().getMonth() + 1;
                  let appYear = new Date().getFullYear() ;
                  this.searchModel.month = appMonth;
                  this.searchModel.year = appYear;
     }
  
    ngOnInit() {
      setTimeout(()=> {
        this.getPenalty();
      },1000);

    
    } 

  


  
    getPenalty(){
        this.loading = false;
  
        this.loading =true;
        this.staffService.thisMonthPenalty(this.searchModel).subscribe(
          res => {
            console.log('result...',res)
            this.loading = false;
            this.penalize = res['record'];
            this.penalize = this.penalize.sort((a, b) => a.name.normalize().localeCompare(b.name.normalize()));
          },
          err => {
            this.loading = false;
            console.log(err)
            this.penalize = [];
            let message = (err.error.msg) ? err.error.msg : 'Internet connection failed!';
            this.userService.generalToastSh(message);
          }
        );
      
    
    }

    

    
    reloadPenalty(){
      this.loading = true;
      this.staffService.thisMonthPenalty(this.searchModel).subscribe(
        res => {
          this.loading = false;
          this.penalize = res['record'];
          this.penalize.sort()
          // this.penalize = this.penalize.sort((a, b) => a.name.normalize().localeCompare(b.name.normalize()));
          this.penalize = this.penalize.sort((a, b) => a.name.toLocaleLowerCase().normalize().localeCompare(b.name.toLocaleLowerCase().normalize()));

          this.refresherRef.complete();
        },
        err => {
          this.loading = false;
          this.refresherRef.complete();
          console.log(err)
          this.penalize = [];
          let message = (err.error.msg) ? err.error.msg : 'Internet connection failed!';
          this.userService.generalToastSh(message);
        }
      );
    }
   

    submitDate(form: NgForm){
      console.log(form.value);
      console.log(this.model);
      this.findByDay();
    }




    // tslint:disable-next-line: member-ordering
    filter_Month_Year: any = {
      buttons: [{
        text: 'CANCEL',
        handler: (event) => console.log('calender cancelled')
      }, {
        text: 'SEARCH',
        handler: (event) => {
          this.loading = true;
          this.searchModel.month = event.month.value;
          this.searchModel.year = event.year.value;
          this.staffService.reloadPenalty(this.searchModel).subscribe(
          res => {
            this.loading = false;
            this.penalize = res['record'];
            this.penalize = this.penalize.sort((a, b) => a.name.toLocaleLowerCase().normalize().localeCompare(b.name.toLocaleLowerCase().normalize()));


            // this.staffService.penaltySaver = this.penalize;
          },
          err => {
            this.loading = false;
            console.log(err)
            this.penalize = [];
            this.userService.generalToastSh(err.error.msg);
          }
        );
        }
      }]
};

    findByDay(){
      this.loading = true;
      this.staffService.findPenaltyDate(this.model).subscribe(
        res => {
          this.loading = false;
        },
        err => {
          this.loading = false;
          console.log();
          this.penalize =[]; 
          this.userService.generalToastSh(err.error.msg);
        }
      );
    }
  
    doRefresh(event){ 
      this.reloadPenalty();
     
    }

   async searchPenalty(){
      this.loading = true;
      this.staffService.searchPenalty(this.searchModel).subscribe(
        res=> {
          this.loading = false;

        this.penalize = res['users']; 
          this.penalize = this.penalize.sort((a, b) => a.name.toLocaleLowerCase().normalize().localeCompare(b.name.toLocaleLowerCase().normalize()));


        },
        err=>{
          this.loading = false;
          this.penalize = [];
          this.userService.generalToast(err.error.msg);
        }
      )
    }


    async viewPenalty(item) {
      const modal = await this.modalController.create({
      component: ViewPenaltyComponent,
      componentProps: { item: item, model: this.searchModel }
      });
      await modal.present();
      const data = await modal.onDidDismiss();
      console.log(data)
    }
  
  
  
    // getThisMonthPenalty() {
    //   this.staffService.thisMonthPenalty(this.searchModel);
    // }
  
  


    //  thisMonthRecord(event){
     
    //    this.searchModel.month = event.next.month;
    //    this.searchModel.year = event.next.year;
    //    console.log(this.searchModel);
    //    this.staffService.thisMonthPenalty(this.searchModel).subscribe(
    //      res => {
    //        console.log('this month',res);
    //        this.penalize = res['record'];
    //      },
    //      err => {
    //        console.log(err)
    //        this.penalize = [];
    //        this.userService.generalToastSh(err.error.msg);
    //      }
    //    );
    // }

  
}
