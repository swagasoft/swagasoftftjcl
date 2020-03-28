import { UserServiceService } from './../../shared/user-service.service';
import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { OutletService } from 'src/app/shared/outlet.service';
import { DistributionService } from 'src/app/shared/distribution.service';

@Component({
  selector: 'app-return-modal',
  templateUrl: './return-modal.component.html',
  styleUrls: ['./return-modal.component.scss'],
})
export class ReturnModalComponent implements OnInit {
  allOutlet: any;
  loading = false;
  singleOutlet: any;
  admin: any;
  constructor(public modalController: ModalController,
              private outletService: OutletService,
              public userService: UserServiceService,
              private distService: DistributionService, ) { 
                this.getProdId();
                this.getAllOutlets();
                this.admin = localStorage.getItem('appUser');
                this.model.admin = this.admin;
              }

  model = {
    pineapple: null,
    orange: null,
    watermelon: null,
    tigernut: null,
    carrot : null,
    sugarcane: null,
    slg : null,
    outlet: '',
    location: '',
    admin: '',
    fileId : '',
    date: Date.now()
  };
  ngOnInit() {}

  closeModal() {
    this.modalController.dismiss();
    console.log('i clicked close');
  }

  selectOutlet(event) {
    console.log(event.target.value);
    const outletId = event.target.value;
    this.loading = true;
    this.distService.findOutlet(outletId).subscribe(
      res => {
        this.loading = false;
        this.loading = false;
        this.singleOutlet = res['outlet'];
        this.model.outlet = res['outlet']['code'];
        this.model.location = res['outlet']['location'];
        console.log(res);
      },
      err => {
        this.loading = false;
        console.log(err);
      }
    );

  }

  getAllOutlets() {
    this.loading = true;
    this.outletService.findAlloutlets().subscribe(
      res => {
        this.loading = false; this.allOutlet = res;
        console.log(this.allOutlet);

      },
      err => {
        this.loading = false; this.userService.generalToast(err.error.msg);
        console.log(err);
      }
    );
  }
  getProdId(){
    this.loading = true;
    this.distService.getProduction().subscribe(
      res => {
        this.loading = false;
        this.model.fileId = res['docs']['_id'];
      },
      err => {
        this.loading = false;
        console.log(err);
      }
    );
  }

  
  submitForm(){
    console.log(this.model);
    this.loading = true;
    this.model.date = Date.now(); 
    this.distService.submitReturns(this.model).subscribe(
      res => {
        console.log(res);
        this.loading = false;
        this.userService.generalToastSh(res['msg']);
        this.closeModal();
      },
      err => {
        this.loading = false;
        console.log(err);
        this.userService.generalToast(err.error.msg);
      }
    );
    

  }

}
