import { UserServiceService } from 'src/app/shared/user-service.service';
import { RecordService } from './../../shared/record.service';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-fruitmodal',
  templateUrl: './fruitmodal.component.html',
  styleUrls: ['./fruitmodal.component.scss'],
})
export class FruitmodalComponent implements OnInit {
loading = false;
  constructor( public modalController: ModalController,
    public userService: UserServiceService,
     private recordService: RecordService) { }
  fruitModel = {
    product: '',
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
    console.log(this.fruitModel);
    this.recordService.submitFruit(this.fruitModel).subscribe(
      res => {
        this.closeModal();
        console.log(res);
      },
      err => {
        console.log(err);
        this.userService.generalToastSh(err.error.msg);
      }
    )
        }
}
