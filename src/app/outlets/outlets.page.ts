import { UserServiceService } from './../shared/user-service.service';
import { OutletService } from './../shared/outlet.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Button } from 'protractor';

@Component({
  selector: 'app-outlets',
  templateUrl: './outlets.page.html',
  styleUrls: ['./outlets.page.scss'],
})
export class OutletsPage implements OnInit {
  loading = false;
  showEditForm = false;
  showOutletlist = true;
  showForm = false; 
  outletList: any;
  outletEdit: any;
  admin:any;

  constructor(private outletService: OutletService,
              public alertController: AlertController,
              private userService: UserServiceService) { 
                this.admin = localStorage.getItem('appUser');
                this.model.admin = this.admin;
    this.getAllOutlet();
  }

  model = {
    name :'',
    admin:'',
   code: "",
   p_price:null, o_price: null, w_price : null, t_price: null, c_price : null,
    s_price: null, slg_price: null, axis:'', location : '', id:'', search:'',
    p_max: null, o_max:null,w_max:null,t_max:null,c_max:null, s_max:null,slg_max:null,
    merchant_p:null,merchant_o:null, merchant_w:null, merchant_t:null, merchant_c:null,
    merchant_s:null, merchant_slg:null
  }
  resetForm(){
  this.model = {
    name :'',
    admin: this.admin,
    code: "",
    p_price:null, o_price: null, w_price : null, t_price: null, c_price : null,
     s_price: null,slg_price: null, axis:'', location : '', id:'', search:'',
     p_max: null, o_max:null,w_max:null,t_max:null,c_max:null, s_max:null,slg_max:null,
     merchant_p:null,merchant_o:null, merchant_w:null, merchant_t:null, merchant_c:null,
    merchant_s:null, merchant_slg:null
  }


  }

  modelSel = {
    filterOptions : [
    ],
  
  } 
  ngOnInit() {
  }

  addNewOutlet(){
    this.showForm = true;
    this.showOutletlist = false;
  }

  createOutlet(form : NgForm){
    this.loading = true;
    this.outletService.createOutlet(this.model).subscribe(
      res => {
        this.loading = false; this.userService.generalToast(res['msg']);
        this.resetForm();
        this.getAllOutlet();
      },
      err => {
        this.loading  = false; this.userService.generalToast(err.error['msg']);
      }
    );
  }

  searchOutlet(){
    const search = this.model;
    console.log(search);
    this.loading = true;
    this.outletService.searchOutlet(search).subscribe(
      res => {
        this.loading = false;
        this.outletList = res['docs'];
        console.log(res);
      },
      err => {
        this.loading = false;
        this.userService.generalToast(err.error['msg']);
      }
    );
  }

  selectChange( $event) {
    console.log($event);
    this.model.axis = $event;
        }

    cancelForm(){
      this.showForm = false;
      this.showOutletlist = true;
    }


    getAllOutlet(){
      this.loading = true;
      this.outletService.findAlloutlets().subscribe(
        res => {
          this.loading = false; this.outletList = res;
          console.log(res);
        },
        err => {
          console.log(err);
          this.loading = false; this.userService.generalToast(err.error['msg']);
        }
      );
    }

   async deleteOutlet(id){
      const alert = await this.alertController.create({
        header: ` Delete outlet?`, cssClass : 'success', message : `document cannot be recovered!`,
        buttons: [ { text: 'CANCEL', cssClass : 'success', handler: (val) => {
             console.log('close notice');
            }
          },
          {
            text: 'DELETE', role: 'cancel', cssClass: 'danger', handler: () => {
              this.loading = true;
              this.outletService.deleteOutlet(id).subscribe(
                res => {
                  this.userService.generalToast(res['msg']); this.getAllOutlet();
                },
                err => {
                  this.userService.generalToast(err.error['msg']);
                }
              );
            }
          }
        ]
      });
      await alert.present();
    }


    async editOutlet(id){
      const alert = await this.alertController.create({
        header: ` Edit outlet?`, cssClass : 'success', message : `edit oulet properties`,
     
        buttons: [ { text: 'CANCEL', cssClass : 'success', handler: (val) => {
             console.log('close notice');
            }
          },
          {
            text: 'YES', role: 'cancel', cssClass: 'danger', handler: () => {
              this.loading = true; console.log(id);
              this.outletService.editOutlet(id).subscribe(
               res => {
                 console.log(res);
               },
               err => {
                 console.log(err.error['msg']);
               }
             );
            }
          }
        ]
      });
      await alert.present();
    }


    

}
