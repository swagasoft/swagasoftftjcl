import { AlertService } from './../shared/alert.service';
import { NgForm } from '@angular/forms';
import { UserServiceService } from './../shared/user-service.service';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.page.html',
  styleUrls: ['./manager.page.scss'],
})
export class ManagerPage implements OnInit {
  loading = false;
  showList = true;
  listOfUsers : any;
  showUserForm = false; 
  phoneRegex =  /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

  constructor(private userService : UserServiceService,
              public alertService: AlertService,
              private alertController : AlertController) {
        this.getAllUsers();
   }
 
  model = {
    username : '',
    phone : null,
    role : '',
    password : '',
    search: ''

  }
  modelSel = {
    filterOptions : [
    ],
  
  } 
  ngOnInit() {
  }

  searchUser(){
    this.loading = true;
    let search = { user : this.model.search};
    this.userService.searchUser(search).subscribe(
      res => {
        console.log(res);
        this.loading = false;
        this.listOfUsers = res['docs'];
      },
      err => {
        this.loading = false;
        let msg = err.error['msg'];
        this.userService.generalToast(err.error.message);
        console.log(err);
      }
    );
    
  }

  selectChange( $event) {
    console.log($event);
    this.model.role = $event;
        }

        getAllUsers(){
          this.loading = true;
          this.userService.getAllUsers().subscribe(
            response => {
              this.loading= false;
              this.listOfUsers = response['users'];
              console.log(this.listOfUsers);

            },
            err => {
              this.loading = false;
              let msg = err.error['msg'];
              this.userService.generalToast(msg);
              console.log(err);
            }
          );
        }



  createUser(form : NgForm){
    this.loading = true;
  
    
    this.userService.createUser(this.model).subscribe(
      response => {
        this.loading = false;
        let header = 'success';
        console.log(response);
        this.alertService.generalAlert(header, response['message']);
        this.getAllUsers();

      },
      err => {
        this.loading = false;
        let head = 'error';
        this.alertService.generalToast(head, err.error.message);
      }
    );

  }

  addNewUser(){
    this.showUserForm = true;
    this.showList = false;
  }

  cancelForm(){
    this.showUserForm = false;
    this.showList = true;
  }

  disable(id){
    this.loading = true;
    this.userService.disableUser(id).subscribe(
      res => {
        this.loading = false;
        this.getAllUsers();
        let message = res['msg'];
        this.userService.generalToast(message);
      },
      err => {
        console.log(err);
        this.loading = false;
      }
    );
  }
  
  activateUser(id){
    this.loading = true;
    this.userService.activateUser(id).subscribe(
      res => {
        this.loading = false;
        let message = res['msg'];
        this.userService.generalToast(message);
        console.log(message);
        this.getAllUsers();
      },
      err => {
        this.loading = false;
        this.userService.generalToast(err.error);
        console.log(err);
      }
    );
  }

  async confirmDelete(user_id) {
    const alert = await this.alertController.create({
      header: ' DELETE USER!',
      message : `<h3> Do you realy want to delte user? <br>
                <h6 class="text-danger"> user cannot be recovered...</h3>`,
   
                buttons: [
                  {
                    text: 'Cancel',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: (blah) => {
                      console.log('cancle delete');
                    }
                  }, {
                    text: 'Yes',
                    cssClass: 'danger',
                    handler: () => {
                    this.loading =  true;
                    this.userService.deleteUser(user_id).subscribe(
                      res=> {
                        this.loading = false;
                        console.log(res);
                        let msg = res['msg'];
                        this.userService.generalToast(msg);
                        this.getAllUsers();
                      },
                      err => {
                        let myError = err.error['msg'];
                        this.userService.generalToast(myError);
                      }
                    );
                    }
                  }
                ]
    });
  
    await alert.present();
  }

}
