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
allSize = [];
  constructor( public modalController: ModalController,
               public userService: UserServiceService,
               private recordService: RecordService) { }
  fruitModel = {
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
     this.recordService.submitFruit(this.fruitModel).subscribe(
      res => {
        this.loading = false;
        this.closeModal();
        console.log(res);
      },
      err => {
        this.loading = false;
        console.log(err);
        this.userService.generalToastSh(err.error.msg);
      }
    );
        }
}
