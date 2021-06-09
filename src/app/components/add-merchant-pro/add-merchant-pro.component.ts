import { ModalController } from '@ionic/angular';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-merchant-pro',
  templateUrl: './add-merchant-pro.component.html',
  styleUrls: ['./add-merchant-pro.component.scss'],
})
export class AddMerchantProComponent implements OnInit {
@Input() allOutlet;
showForm : Boolean;
salesRecord = [];

  constructor(private modalController : ModalController) { }

  newMerchantModel = {name:'', group:'', outlet:'', bottles:''}

  ngOnInit() {
    console.log(this.allOutlet);
  }

  dismiss(){
    this.modalController.dismiss();
  }


  newMerchantClick(){
    this.showForm = true;
  }

  submitUser(){
    console.log(this.newMerchantModel)
  }
}
