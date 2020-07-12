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
     
      localStorage.setItem('user-role',response['doc']['role']);
      this.loading = false;
      this.userService.refreshDetails();
      this.router.navigate(['/distributions']);
   
        
    }, err => {
      this.loading = false;
      let message = (err.error.message) ? err.error.message : 'Internet connnection failed!';
      this.userService.generalToast(message);
    });
  }

}
