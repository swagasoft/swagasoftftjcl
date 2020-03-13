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
    product: '',
    id:'',
    very_big: 0,
    big: 0,
    medium:0,
    small:0,
    very_small: 0,
    amount: 0,
    kg:undefined,
    supplier:'',
    driver:'',
    admin:''
  }
  ngOnInit() {
    this.fruitModel.admin =localStorage.getItem('appUser');
    this.fruitModel.id = this.navParams.get('id');
    this.fruitModel.product = this.navParams.get('product');
    this.fruitModel.very_big = this.navParams.get('very_big');
    this.fruitModel.big = this.navParams.get('big');
    this.fruitModel.medium = this.navParams.get('medium');
    this.fruitModel.small = this.navParams.get('small');
    console.log(this.fruitModel.medium);
    this.fruitModel.very_big = this.navParams.get('very_big');
    this.fruitModel.big = this.navParams.get('big');
    this.fruitModel.medium = this.navParams.get('medium');
    this.fruitModel.small = this.navParams.get('small');
    this.fruitModel.amount = this.navParams.get('amount');
    this.fruitModel.kg = this.navParams.get('kilo');
    this.fruitModel.supplier = this.navParams.get('supplier');
    this.fruitModel.driver = this.navParams.get('driver');
    console.log(this.fruitModel.admin);
  }

  closeModal(){
    this.modalController.dismiss();
    console.log('i clicked close')
  }

  
  selectChange( $event) {
    console.log($event);
    this.fruitModel.product = $event;
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
