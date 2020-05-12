import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { UserServiceService } from 'src/app/shared/user-service.service';
import { RecordService } from 'src/app/shared/record.service';

@Component({
  selector: 'app-fruitedit',
  templateUrl: './fruitedit.component.html',
  styleUrls: ['./fruitedit.component.scss'],
})
export class FruiteditComponent implements OnInit {
  loading = false;
  constructor( public modalController: ModalController,
               public navParams: NavParams,
               public userService: UserServiceService,
               private recordService: RecordService) { 
               }

               fruitModel = {
                id:'',
                quantity:'',
                buyer:'',
                assist_buyer:'',
                confirmed_by:'',
                bottles:'',
                remark:'',
                paid_for:'',
                damage:'',
                product: '',
                size: '',
                amount: 0,
                kg:undefined,
                supplier:'',
                driver:'',
                admin:'',
                date: Date.now()
              }

  ngOnInit() {
    

    this.fruitModel.admin =localStorage.getItem('appUser');
    this.fruitModel.id = this.navParams.get('id');
    this.fruitModel.product = this.navParams.get('product');
    this.fruitModel.damage = this.navParams.get('damage');
    this.fruitModel.assist_buyer = this.navParams.get('assist_buyer');
    this.fruitModel.paid_for = this.navParams.get('paid_for');
    this.fruitModel.buyer = this.navParams.get('buyer');
    this.fruitModel.size = this.navParams.get('size');
    this.fruitModel.remark = this.navParams.get('remark');
    this.fruitModel.confirmed_by = this.navParams.get('confirmed_by');
    this.fruitModel.quantity = this.navParams.get('quantity');
    this.fruitModel.bottles = this.navParams.get('bottles');


    this.fruitModel.amount = this.navParams.get('amount');
    this.fruitModel.kg = this.navParams.get('kilo');
    this.fruitModel.supplier = this.navParams.get('supplier');
    this.fruitModel.driver = this.navParams.get('driver');
    console.log(this.fruitModel.assist_buyer);
  }

  closeModal(){
    this.modalController.dismiss();
    console.log('i clicked close')
  }

  selectChange( $event) {
    console.log($event);
    this.fruitModel.product = $event;
        } 

  selectSize( $event) {
    console.log($event);
    this.fruitModel.size = $event;
        }

   submitFruit(){
     this.loading = true;
     console.log(this.fruitModel);
     this.recordService.editFruit(this.fruitModel).subscribe(
      res => {
        this.loading = false;
        this.closeModal();
        this.userService.generalToastSh(res['msg']);
        console.log(res);
      },
      err => {
        console.log(err);
        this.loading = false;
        this.userService.generalToast(err.error.msg);
      }
    );
        }
}
