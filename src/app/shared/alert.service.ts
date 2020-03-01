import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(public alertController: AlertController,
    public toastController: ToastController) { }

    async generalToast(header,message) {
      const toast = await this.toastController.create({
        header:  `${header}`,
        message: `${message}`,
        position: 'middle',
        duration: 3000
      });
      toast.present();
    }

    async generalAlert(header, message) {
      const alert = await this.alertController.create({
        header: `${header}`,
        cssClass : 'success',
        message : `${message}`,
     
        buttons: [ {
            text: 'continue',
            cssClass : 'success',
            handler: (val) => {
             console.log('close notice');
            }
          }
        ]
      });
    
      await alert.present();
    }
}
