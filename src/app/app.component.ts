
import { UserServiceService } from './shared/user-service.service';
import { Component } from '@angular/core';
import {Plugins} from '@capacitor/core';
const {SplashScreen} = Plugins;
import { Platform } from '@ionic/angular';
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
dark = false;

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
      title: 'FRUIT',
      url: '/fruit',
      icon: 'nutrition'
    },
     {
      title: 'PENALTY',
      url: '/penalty',
      icon: 'cut'
    },
   
     {
      title: 'STAFF',
      url: '/staff-list',
      icon: 'contacts'
    },
     {
      title: 'OUTLETS',
      url: '/outlets',
      icon: 'home'
    }, 
   
  ]

  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor(
    private platform: Platform,
    private statusBar: StatusBar,
    public userService: UserServiceService
  ) {
    this.initializeApp();
    
   
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.show();
      SplashScreen.hide();
      timer(2000).subscribe(()=> this.showSlash = false);
      this.app_user = localStorage.getItem('appUser');
      this.userRole = localStorage.getItem('user-role');
 
    });
  }

  logout(){
    this.userService.logout();
  }


}
