import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { UserServiceService } from 'src/app/shared/user-service.service';
import { DistributionService } from 'src/app/shared/distribution.service';

@Component({
  selector: 'app-edit-bad-stock',
  templateUrl: './edit-bad-stock.component.html',
  styleUrls: ['./edit-bad-stock.component.scss'],
})
export class EditBadStockComponent implements OnInit {
loading= false;
  constructor(public navParams: NavParams,
    public userService: UserServiceService ,
    private distService: DistributionService,
    public modalController: ModalController) { }

  model = {
    bad_p : 0,
    bad_o : 0,
    bad_w : 0,
    bad_t: 0,
    bad_c: 0,
    bad_s : 0,
    bad_slg : 0,
    admin:'',
    id:null,
    date: Date.now
  };
  ngOnInit() {

    this.model.id = this.navParams.get('id');
    this.model.bad_p = this.navParams.get('bad_p');
    this.model.bad_o = this.navParams.get('bad_o');
    this.model.bad_w = this.navParams.get('bad_w');
    this.model.bad_t = this.navParams.get('bad_t');
    this.model.bad_c = this.navParams.get('bad_c');
    this.model.bad_s = this.navParams.get('bad_s');
    this.model.bad_slg = this.navParams.get('bad_slg');
    console.log(this.model.id);
  }

  resetProd(){
    this.model = {
      bad_p : 0,
      bad_o : 0,
      bad_w : 0,
      bad_t: 0,
      bad_c: 0,
      bad_s : 0,
      bad_slg : 0,
      admin:'',
      id:null,
      date: Date.now
    };
  }

  closeModal(){
    this.modalController.dismiss();
  }

  updateBadStock(){
    this.loading = true;
    this.distService.editBadStock(this.model).subscribe(
      res=> {
        this.loading = false;
        console.log(res);
        this.closeModal();
      },
      err=> {
        this.loading = false;
        console.log(err);
        this.userService.generalToast(err.error.msg);
      }
    );
  }

}
