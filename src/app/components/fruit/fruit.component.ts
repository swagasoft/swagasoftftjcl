import { FruiteditComponent } from './../fruitedit/fruitedit.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, AlertController, IonRefresher } from '@ionic/angular';
import { UserServiceService } from 'src/app/shared/user-service.service';
import { RecordService } from 'src/app/shared/record.service';
import { FruitmodalComponent } from '../fruitmodal/fruitmodal.component';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-fruit',
  templateUrl: './fruit.component.html',
  styleUrls: ['./fruit.component.scss'],
})
export class FruitComponent implements OnInit {
  
  @ViewChild('refresherRef', {static : false}) refresherRef: IonRefresher;
  fruit = [];
  loading = true;
  myDate  = new Date();
  fruitRecord = [];
  
    constructor( public modalController: ModalController,
                 public alertController: AlertController,
                 public userService: UserServiceService,
                 public recordService: RecordService) {
                  let appMonth = new Date().getMonth() + 1;
                  let appYear = new Date().getFullYear() ;
                  this.searchModel.month = appMonth;
                  this.searchModel.year = appYear;
                  }
  
  
  model = {
      filterOptions:'',
      date:''
    }

    searchModel = { 
      search: '',fullname: '', month: null, year : null
      };
  
  ngOnInit() {
    setTimeout(()=> {
      this.getFruitRecord();
    },1000);
    }


    getFruitRecord(){
      if(this.recordService.fruitSaver.length > 0){
        this.fruitRecord = this.recordService.fruitSaver;
        this.loading = false;
      }else{
        this.loading = true;
        this.recordService.thisMonthFruit(this.searchModel).subscribe(
          res => {
            this.loading = false;
            console.log('this month',res);
            this.fruitRecord = res['record'];
            this.recordService.fruitSaver = this.fruitRecord;
          },
          err => {
            this.loading = false;
            console.log(err)
            this.fruitRecord = [];
            let message = (err.error.msg) ? err.error.msg : 'Internet connnection failed!';
            this.userService.generalToastSh(message);
          }
        );
      }
     
    }


    
    refreshFruitRecord(){
        this.loading = true;
        this.recordService.thisMonthFruit(this.searchModel).subscribe(
          res => {
            this.loading = false;
            this.fruitRecord = res['record'];
            this.recordService.fruitSaver = this.fruitRecord;
            this.refresherRef.complete();
          },
          err => {
            this.loading = false;
            console.log(err)
            this.fruitRecord = [];
            this.refresherRef.complete();
            let message = (err.error.msg) ? err.error.msg : 'Internet connnection failed!';
            this.userService.generalToastSh(message);
          }
        );
      
     
    }


     // tslint:disable-next-line: member-ordering
     filter_Month_Year: any = {
              buttons: [{
                text: 'CANCEL',
                handler: (event) => console.log('calender cancelled')
              }, {
                text: 'SEARCH',
                handler: (event) => {
                this.searchModel.month = event.month.value;
                this.searchModel.year = event.year.value;
                this.loading = true;
                this.recordService.reloadThisMonthFruit(this.searchModel).subscribe(
                  res => {
                    this.loading = false;
                    console.log('this month',res);
                    this.fruitRecord = res['record'];
                    this.recordService.fruitSaver = this.fruitRecord;
                  },
                  err => {
                    this.loading = false;
                    console.log(err)
                    this.fruitRecord = [];
                    this.userService.generalToastSh(err.error.msg);
                  }
                );
                }
              }]
    };

    doRefresh(event){
      this.refreshFruitRecord();
    }
  
  
  selectChange(event){
      console.log(event);
    }
  
    async addRecord() {
      const modal = await this.modalController.create({
        component: FruitmodalComponent,
      });
      modal.onDidDismiss().then(()=> {
        console.log('i dismiss this modal');
        this.refreshFruitRecord();
      });
      return await modal.present();
  }
  
 

    async editRecord(id,product,damage,assist_buyer,paid_for,
      amount,kilo,supplier,driver,quantity,confirmed_by,buyer, size,remark, bottles){
        const modal = await this.modalController.create({
          component: FruiteditComponent,
          componentProps: {
            'id': id,
            'product':product ,
            'damage':damage ,
            'assist_buyer':assist_buyer ,
            'paid_for':paid_for ,
            'buyer':buyer ,
            'confirmed_by':confirmed_by ,
            'quantity':quantity ,
            'amount': amount,
            'remark': remark,
            'kilo': kilo,
            'size': size,
            'supplier': supplier,
            'driver': driver,
            'bottles': bottles
          }
        });
        modal.onDidDismiss().then(()=> {
          console.log('i dismiss this modal');
          this.refreshFruitRecord();
        });
        return await modal.present();
     
    }
  
    submitDate(form: NgForm){
      console.log(form.value);
      console.log(this.model.date);
      this.findByDate();
    }
  
    findByDate(){
      this.loading = true;
      this.recordService.findBydate(this.model.date).subscribe(
        res => {
          this.loading = false;
          this.fruitRecord = res['record'];
          this.recordService.fruitSaver = this.fruitRecord;
        },
        err => {
          this.loading = false;
          this.fruitRecord =[];
          this.userService.generalToastSh(err.error.msg);
        }
      );
    }
  
    verify(id){
      this.loading = true;
      this.recordService.verifyFruit(id).subscribe(
        res => {
          this.loading = false;
          this.userService.generalToastSh(res['msg']);
          this.refreshFruitRecord();
        },
        err => {
          this.loading = false;
          this.userService.generalToastSh(err.error.msg);
        }
      );
    }

    disprove(id){
      this.loading = true;
      this.recordService.disprove(id).subscribe(
        res => {
          this.loading = false;
          this.userService.generalToastSh(res['msg']);
          this.refreshFruitRecord();
        },
        err => {
          this.loading = false;
          this.userService.generalToastSh(err.error.msg);
        }
      );
    }
  
    okRecord(id){
      this.loading = true;
      this.recordService.okFruitRecord(id).subscribe(
        res => {
          this.loading = false;
          this.refreshFruitRecord();
          this.userService.generalToastSh(res['msg']);
        },
        err => {
          this.loading = false;
          this.userService.generalToastSh(err.error.msg);
        }
      );

    }   
    
    UnokRecord(id){
      this.loading = true;
      this.recordService.UnOkFruitRecord(id).subscribe(
        res => {
          this.loading= false;
          this.refreshFruitRecord();
          this.userService.generalToastSh(res['msg']);
        },
        err => {
          this.loading = false;
          this.userService.generalToastSh(err.error.msg);
        }
      );
    }
  
  
  
  
}
