import { UserServiceService } from 'src/app/shared/user-service.service';
import { Component, Input, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { StaffService } from 'src/app/shared/staff.service';

@Component({
  selector: 'app-view-penalty',
  templateUrl: './view-penalty.component.html',
  styleUrls: ['./view-penalty.component.scss'],
})
export class ViewPenaltyComponent implements OnInit {
@Input() model;
@Input() item;
loading : Boolean;
penalize  = [];
  constructor(private modalController: ModalController, public staffService: StaffService ,
    public userService : UserServiceService, private alertController : AlertController) {}

  ngOnInit() {
    console.log(this.model)
    console.log(this.item)
    this.searchModel.month = this.model.month;
    this.searchModel.year = this.model.year;
    this.searchModel.user_id = this.item.user_id;
    console.log(this.searchModel);
    this.getPenalties();

  }

  searchModel = {month:'', year:'', user_id:''}


  dismiss(){
    this.modalController.dismiss();
  }

  getPenalties(){
    this.loading = true;
    this.staffService.getPersonalPenalty(this.searchModel).subscribe(res => {
      console.log(res);
      this.penalize = res['record']
      this.loading = false;
    }, err => {
      this.loading = false;
    });
  }



  async waveRecord(id){
    const alert = await this.alertController.create({
      header: `WAVE PENALTY?`,
     
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
            this.loading = true;
            this.staffService.wavePenalty(id).subscribe(
            res => {
              this.loading = false;
              this.userService.generalToastSh(res['msg']);
              this.getPenalties();
            },
            err => {
              this.loading = false;
              this.userService.generalToast(err.error.msg);
            }
          );
        }
          }
        
      ]
    });
    await alert.present();
  }

  async deleteRecord(id){
    const alert = await this.alertController.create({
      header: `DELETE PENALTY?`,
     
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
            console.log(id);
            this.loading = true;
            this.staffService.deletePenalty(id).subscribe(
            res => {
              this.loading = false;
              this.getPenalties();
              this.userService.generalToastSh(res['msg']);
            },
            err => {
              this.loading = false;
              this.userService.generalToast(err.error.msg);
            }
          );
        }
          }
        
      ]
    });
    await alert.present();
  }


  unVerifyPenalty(id){
    this.loading = true;
    this.staffService.unVerifyPenal(id).subscribe(
      res=> {
        this.loading = false;
        this.userService.generalToastSh(res['msg']);
        this.getPenalties();
      }
    );
  }
  confirmPenalty(id){
    this.loading = true;
    this.staffService.confirmPenal(id).subscribe(
      res=> {
        this.loading = false;
        this.userService.generalToastSh(res['msg']);
        this.getPenalties();
      }
    );
  }

  handleTreated(item){
    console.log(item);
    const oldPenalize = this.penalize;
    let exist = this.penalize.find(element => element._id == item._id);
    if (exist) {
      exist.treated  = (exist.treated == true) ? false : true;
      console.log("goood",exist);
      this.userService.updatePenaltyRemark(exist).subscribe(res => {
        console.log("saved ", res);
      })
    } else {
    this.userService.generalToast('error updating record!');
    
    }

  }


  verifyPenalty(id){
    this.loading = true;
    this.staffService.verifyPenal(id).subscribe(
      res=> {
        this.loading = false;
        this.userService.generalToastSh(res['msg']);
        this.getPenalties()
      }
    );
  }

 

  unConfirmPenalty(id){
    this.loading = true;
    this.staffService.unConfirmPenal(id).subscribe(
      res=> {
        this.loading = false;
        this.userService.generalToastSh(res['msg']);
        this.getPenalties()
      }
    );
  }


  async editRecord(id,user_id,amount, reason){
    const alert = await this.alertController.create({
      header: `EDIT THIS RECORD?`,
      inputs: [ {  name: 'amount', type: 'number',value: amount, placeholder: 'enter amount',
        },
      { name: 'reason', type: 'text', value: reason, placeholder: 'enter offence',
      }],
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
            if (values.amount == '' || values.reason == ''){
              this.userService.generalToast("you did not enter amount/reasons");
            }else{
            this.loading = true;
            let body = {
                values: values,
                admin:  this.userService.getUsername(),
                user_id: user_id,
                id : id
            } 
            this.staffService.editPenalty(body).subscribe(
            res => {
              this.loading = false;
              this.userService.generalToastSh(res['msg']);
              this.getPenalties()
            },
            err => {
              this.loading = false;
              this.penalize = [];
              this.userService.generalToast(err.error.msg);
            }
          );
        }
          }
        }
      ]
    });
    await alert.present();
  }


}
