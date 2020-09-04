import { UserServiceService } from './../shared/user-service.service';
import { OutletService } from './../shared/outlet.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Button } from 'protractor';
import { StaffService } from '../shared/staff.service';

@Component({
  selector: 'app-outlets',
  templateUrl: './outlets.page.html',
  styleUrls: ['./outlets.page.scss'],
})
export class OutletsPage implements OnInit {
  showOutletlist = true;
  showForm = false; 
  showEdit = false;
  admin:any;
  selectedAxis: any;
  loading = true;
  outletList: any[] = [];


  constructor(public outletService: OutletService,
              public alertController: AlertController,
              public staffService: StaffService,
              public userService: UserServiceService) { 
                this.admin = localStorage.getItem('appUser');
                this.model.admin = this.admin;
             
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
    setTimeout(()=> {
      this.getAllOutlet();
    },1000);
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
              this.reloadoutlet();
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
        this.reloadOutlet();
      },
      err => {
        this.loading  = false; this.userService.generalToast(err.error['msg']);
      }
    );
  }

  searchOutlet(){
    const search = this.model;
    this.loading = true;
    this.outletService.searchOutlet(search).subscribe(
      res => {
        this.loading = false;
        this.outletList =  res['docs'];
        this.outletService.outletSaver = this.outletList;
      },
      err => {
        this.loading = false;
        this.userService.generalToast(err.error['msg']);
      }
    );
  }

  selectChange( $event) {
    console.log($event);
    this.model.location = $event;
    this.selectedAxis = $event;
        }

    editModelLocation( $event) {
    console.log($event);
    this.editModel.location = $event;
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
      this.outletList = this.outletService.outletSaver;
      if(this.outletList.length){
       
        console.log('passing data completed!')
        this.loading = false;
        return;
      }else{
        console.log('getting new data')
        this.loading = true;
        this.outletService.findAlloutlets().subscribe(
          res => {
            this.loading = false;
            this.outletList = res['outlets'];
            this.outletService.outletSaver = this.outletList;
          },
          err => {
            this.loading = false;
            this.loading = false; this.userService.generalToast(err.error['msg']);
          }
        );
      }
      
    }


    reloadOutlet(){ 
      this.loading = true;
      this.outletService.findAlloutlets().subscribe(
        res => {
          this.loading = false;
          this.outletList = res['outlets'];
          this.outletService.outletSaver = this.outletList;
        },
        err => {
          this.loading = false;
          this.outletList = [];
          console.log(err);
          this.loading = false; this.userService.generalToast(err.error['msg']);
        }
      );
    }

    reloadoutlet(){
      this.reloadOutlet();
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
                  this.loading = false;
                  this.userService.generalToast(res['msg']); this.reloadOutlet();
                },
                err => {
                  this.loading = false;
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
          this.reloadOutlet();
        },
        err => {
          this.loading = false;
          this.userService.generalToast(err.error.msg);
        }
      );
    }

    

}
