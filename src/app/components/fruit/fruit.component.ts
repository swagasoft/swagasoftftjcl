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
  
    constructor( public modalController: ModalController,
                 public alertController: AlertController,
                 public userService: UserServiceService,
       public recordService: RecordService) { }
  
  
  model = {
      filterOptions:'',
      date:''
    }

    searchModel = { 
      search: '',fullname: '', month: null, year : null
      };
  
  ngOnInit() {
    }

    doRefresh(event){
      this.loading = true;
      this.getRecord();
      this.loading = false;
    }
  

    thisMonthRecord(event){
      this.searchModel.month = event.next.month;
      this.searchModel.year = event.next.year;
      console.log(this.searchModel);
      this.recordService.thisMonthFruit(this.searchModel).subscribe(
        res => {
          console.log('this month',res);
          this.fruit = res['record'];
        },
        err => {
          console.log(err)
          this.fruit = [];
          this.userService.generalToastSh(err.error.msg);
        }
      );
   }

  getRecord(){
      this.loading = true;
      this.recordService.getFruit().subscribe(
        res=> {
          console.log(res);
          this.loading = false;
          this.fruit = res['record'];
          this.refresherRef.complete();
        },
        err => {
          this.loading = false;
          this.refresherRef.complete();
          console.log(err);
        }
      );
    }
  
  selectChange(event){
      console.log(event);
    }
  
    async presentModal() {
   const modal = await this.modalController.create({
     component: FruitmodalComponent,
   });
   modal.onDidDismiss().then(()=> {
     console.log('i dismiss this modal');
     this.getRecord();
   });
   return await modal.present();
  }
  
  
   async moreRecord(){
      const alert = await this.alertController.create({
        header: ``,
        message : `<p>  </p>`,
        buttons: [
          {
            text: 'Cancel', role: 'cancel', cssClass: 'danger',
            handler: (blah) => {
              console.log('cancel amount input');
            }
          }, {
            text: 'Confirm',
            cssClass : 'danger',
            handler: (values) => {
              console.log(values);
             
          }}
        ]
      });
      await alert.present();
    }
  
  
 

    async editRecord(id,product,damage,assist_buyer,paid_for,
      amount,kilo,supplier,driver,quantity,confirmed_by,buyer, size,remark){
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
          }
        });
        modal.onDidDismiss().then(()=> {
          console.log('i dismiss this modal');
          this.getRecord();
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
          this.fruit = res['record'];
        },
        err => {
          this.loading = false;
          this.fruit =[];
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
          this.getRecord();
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
          this.getRecord();
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
          this.getRecord();
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
          this.loading = false;
          this.getRecord();
          this.userService.generalToastSh(res['msg']);
        },
        err => {
          this.loading = false;
          this.userService.generalToastSh(err.error.msg);
        }
      );
    }
  
  
  
  
}
