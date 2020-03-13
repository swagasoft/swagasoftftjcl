import { UserServiceService } from 'src/app/shared/user-service.service';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss'],
})
export class SettingComponent implements OnInit {
loading = true;
mydetails : any;
  constructor(private userService: UserServiceService, public alertController: AlertController
   ) {
    this.getMydetails();
   }

  ngOnInit() {}

  getMydetails(){
    this.userService.getUserDetails().subscribe(
      res => {
        this.mydetails = res['user'];
        this.loading = false;
        console.log(this.mydetails);

      },
      err => {
        console.log(err);
        this.loading = false;
        this.userService.generalToastSh(err.error.msg);
      }
    )
  }

  async resetPassword(){
    const alert = await this.alertController.create({
      header: `CHANGE PASSWORD`,
      inputs: [ {  name: 'password', type: 'text', placeholder: 'enter password',
        },
      { name: 'confirm_pass', type: 'text', placeholder: 'confirm password',
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
            if (values.password != values.confirm_pass || values.password == ""){
              this.userService.generalToastSh("password not match!");
            }else{
            this.loading = true;
            let body = {
                values: values,
            } 
            console.log(body);
            this.userService.resetPassword(body).subscribe(
            res => {
              this.loading = false;
              this.userService.generalToast(res['msg']);
              
            },
            err => {
              this.loading = false;
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
