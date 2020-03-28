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
  showOutletlist = true;
  showForm = false; 
  showEdit = false;
  outletList: any;
  admin:any;
  outletCount: any;
  selectedAxis: any;

  constructor(private outletService: OutletService,
              public alertController: AlertController,
              public userService: UserServiceService) { 
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
    merchant_rate:null,
  }


 
  resetForm(){
  this.model = {
    name :'',
    admin: this.admin,
    code: "",
    p_price:null, o_price: null, w_price : null, t_price: null, c_price : null,
     s_price: null,slg_price: null, axis: this.selectedAxis, location : '', id:'', search:'',
     p_max: null, o_max:null,w_max:null,t_max:null,c_max:null, s_max:null,slg_max:null,
     merchant_rate:null,
  }


  }

  modelSel = {
    filterOptions : [
    ],
  
  } 
  ngOnInit() {
  }

  async editMerchantRate(id,amount){
    const alert = await this.alertController.create({
      header: `EDIT MERCHANTDISER'S RATE?`,
      inputs: [ {  name: 'amount', type: 'number',value: amount, placeholder: 'enter amount',
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
            if (values.amount == ''  ){
              this.userService.generalToast("AMOUNT NOT SPECIFIELD!");
            }else{
            this.loading = true;
            let body = {
                values: values,
                admin: this.admin,
                id : id
            } 
            console.log(body);
            this.outletService.updateMerchantRate(body).subscribe(
            res => {
              this.loading = false;
              this.userService.generalToastSh(res['msg']);
              this.getAllOutlet();
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
    this.selectedAxis = $event;
        }

    cancelForm(){
      this.showForm = false;
      this.showOutletlist = true;
      this.showEdit = false;
    }
    
    cancelEdit(){
      this.showForm = false;
      this.showOutletlist = true;
      this.showEdit = false;
    }


    getAllOutlet(){
      this.loading = true;
      this.outletService.findAlloutlets().subscribe(
        res => {
          this.loading = false;
           this.outletList = res;
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

    editModel = {
        name :'',
        admin:'',
      code: "",
      p_price:null, o_price: null, w_price : null, t_price: null, c_price : null,
        s_price: null, slg_price: null, location : '', id:'', search:'',
        p_max: null, o_max:null,w_max:null,t_max:null,c_max:null, s_max:null,slg_max:null,
     
    }

    async editOutlet(id,name,code,p_price,o_price,w_price,t_price,
      c_price,s_price, slg_price,p_max, o_max, w_max, t_max, c_max, s_max,slg_max,location){
        console.log(location)
        this.showEdit = true;
        this.showOutletlist = false;
        this.showForm = false; 
        this.editModel = {
          name :name,
          admin:this.admin,
        code: code,
        p_price:p_price, o_price: o_price, w_price : w_price, t_price: t_price, c_price : c_price,
          s_price: s_price, slg_price: slg_price, location : location, id:id, search:'',
          p_max: p_max, o_max:o_max,w_max:w_max,t_max:t_max,c_max:c_max, s_max:s_max,slg_max:slg_max,
         
      }
    
    }

    updateOutlet(){
      this.loading = true;
      console.log(this.editModel); 
      this.outletService.editOutlet(this.editModel).subscribe(
        res => {
          this.userService.generalToastSh(res['msg']);
          this.showForm = false;
          this.showOutletlist = true;
          this.showEdit = false;
          this.loading = false;
          this.getAllOutlet();
        },
        err => {
          this.loading = false;
          this.userService.generalToast(err.error.msg);
        }
      )
    }

    

}
