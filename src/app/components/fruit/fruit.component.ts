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
  
  ngOnInit() {
      this.getRecord();
  
    }

    doRefresh(event){
      this.loading = true;
      this.getRecord();
      this.loading = false;
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
  
  
 

    async editRecord(id,product,very_big,big,
      medium,small,very_small,amount,kilo,supplier,driver){
        const modal = await this.modalController.create({
          component: FruiteditComponent,
          componentProps: {
            'id': id,
            'product':product ,
            'very_big': very_big,
            'big': big,
            'medium': medium,
            'small': small,
            'very_small': very_small,
            'amount': amount,
            'kilo': kilo,
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
  
  
  
  
}
