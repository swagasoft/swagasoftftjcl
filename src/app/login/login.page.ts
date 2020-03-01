import { UserServiceService } from './../shared/user-service.service';
import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController, ToastController } from '@ionic/angular';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  phoneRegex =  /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  number: any;
  password: any;
  loading = false;


  constructor(public loadingController: LoadingController,
              private fb: FormBuilder,
              public alertController: AlertController,
              public toastController: ToastController,
              private router: Router, public userService: UserServiceService) { }

              model = {
                number: '',
                password: ''
              };

  ngOnInit() {
  }

  async login(form: any) {
    console.log('login fire')
    this.loading = true;
    this.userService.login(this.model).subscribe(response => {
      this.userService.setToken(response['token']);
      this.userService.loadBalance();
      console.log('RESPONSE FROM LOGIN');
      localStorage.setItem('user_id',response['doc']['user_id']);
      localStorage.setItem('appUser',response['doc']['username']);
      console.log(response);
     
      localStorage.setItem('user-role',response['doc']['role']);
      this.loading = false;
      this.router.navigate(['/distributions']);
   
        
    }, error => {
      this.loading = false;
      let errorMessage = '';
      let message = error.error;
      if(error.error ){
        const message  = error.error;
        this.userService.generalToast(message);
        console.log('LOGIN ERROR');
        console.log(error.statusText);
      }else{
        const messageErr = error.statusText;
        // this.userService.presentToast(messageErr);
        console.log('server error');
      }
     
      // this.loginToast(message);
    });
  }

}
