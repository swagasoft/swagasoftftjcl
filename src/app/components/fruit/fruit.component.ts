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
  loading = false;
  myDate  = new Date();
  
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
    this.recordService.thisMonthFruit(this.searchModel);
    }


     // tslint:disable-next-line: member-ordering
     filter_Month_Year: any = {
              buttons: [{
                text: 'CANCEL',
                handler: (event) => console.log('calender cancelled')
              }, {
                text: 'SEARCH',
                handler: (event) => {
                console.log('clicked search..',event)
                console.log(event.month.value);
                this.searchModel.month = event.month.value;
                this.searchModel.year = event.year.value;
                this.recordService.reloadThisMonthFruit(this.searchModel);
                }
              }]
    };

    doRefresh(event){
      this.recordService.reloadThisMonthFruit(this.searchModel);
      setTimeout(()=> {
        this.refresherRef.complete();
      },1000);
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
        this.recordService.reloadThisMonthFruit(this.searchModel);
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
          this.recordService.reloadThisMonthFruit(this.searchModel);
        });
        return await modal.present();
     
    }
  
    submitDate(form: NgForm){
      console.log(form.value);
      console.log(this.model.date);
      this.findByDate();
    }
  
    findByDate(){
      this.recordService.findBydate(this.model.date);
    }
  
    verify(id){
      this.recordService.loading = true;
      this.recordService.verifyFruit(id).subscribe(
        res => {
          this.recordService.loading = false;
          this.userService.generalToastSh(res['msg']);
          this.recordService.reloadThisMonthFruit(this.searchModel);
        },
        err => {
          this.recordService.loading = false;
          this.userService.generalToastSh(err.error.msg);
        }
      );
    }

    disprove(id){
      this.recordService.loading = true;
      this.recordService.disprove(id).subscribe(
        res => {
          this.recordService.loading = false;
          this.userService.generalToastSh(res['msg']);
          this.recordService.reloadThisMonthFruit(this.searchModel);
        },
        err => {
          this.recordService.loading = false;
          this.userService.generalToastSh(err.error.msg);
        }
      );
    }
  
    okRecord(id){
      this.recordService.loading = true;
      this.recordService.okFruitRecord(id).subscribe(
        res => {
          this.recordService.loading = false;
          this.recordService.reloadThisMonthFruit(this.searchModel);
          this.userService.generalToastSh(res['msg']);
        },
        err => {
          this.recordService.loading = false;
          this.userService.generalToastSh(err.error.msg);
        }
      );

    }   
    
    UnokRecord(id){
      this.recordService.loading = true;
      this.recordService.UnOkFruitRecord(id).subscribe(
        res => {
          this.recordService.loading= false;
          this.recordService.reloadThisMonthFruit(this.searchModel);
          this.userService.generalToastSh(res['msg']);
        },
        err => {
          this.recordService.loading = false;
          this.userService.generalToastSh(err.error.msg);
        }
      );
    }
  
  
  
  
}
