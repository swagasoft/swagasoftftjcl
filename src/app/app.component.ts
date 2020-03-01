import { UserServiceService } from './shared/user-service.service';
import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { timer } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
app_user : any;
showSlash = true;
userRole : any;

  public appPages = [
    {
      title: 'EXPENSES',
      url: '/expenses',
      icon: 'cash'
    },
    
     {
      title: 'DISTRIBUTION',
      url: '/distributions',
      icon: 'list'
    }, 
     {
      title: 'MERCHANDISERS',
      url: '/merchandisers',
      icon: 'calculator'
    }, 
    {
      title: 'FRUITS RECORDS',
      url: '/fruit',
      icon: 'cash'
    },
     {
      title: 'PENALTY',
      url: '/penalty',
      icon: 'cut'
    },
   
     {
      title: 'STAFFS',
      url: '/staff-list',
      icon: 'contacts'
    },
     {
      title: 'OUTLETS',
      url: '/outlets',
      icon: 'home'
    }, 
    {
      title: 'PAYROLE',
      url: '/pay-roll',
      icon: 'cash'
    },
  ]
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public userService: UserServiceService
  ) {
    this.initializeApp();
    
   
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.show();
      this.splashScreen.hide();
      timer(5000).subscribe(()=> this.showSlash = false);
      this.app_user = localStorage.getItem('appUser');
      this.userRole = localStorage.getItem('user-role');
 
    });
  }

  logout(){
    this.userService.logout();
  }
}
