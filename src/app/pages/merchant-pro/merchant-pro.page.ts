import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController, AlertController, IonInfiniteScroll } from '@ionic/angular';
import { NgbDatepickerNavigateEvent } from '@ng-bootstrap/ng-bootstrap';
import { AddMerchantProComponent } from 'src/app/components/add-merchant-pro/add-merchant-pro.component';
import { DistributionService } from 'src/app/shared/distribution.service';
import { OutletService } from 'src/app/shared/outlet.service';
import { UserServiceService } from 'src/app/shared/user-service.service';

@Component({
  selector: 'app-merchant-pro',
  templateUrl: './merchant-pro.page.html',
  styleUrls: ['./merchant-pro.page.scss'],
})
export class MerchantProPage implements OnInit {
  @ViewChild(IonInfiniteScroll,  {static : false}) infiniteScroll: IonInfiniteScroll;
  
  loading = false;
allOutlet : any[];
  singleOutlet: any;
  admin: any;
  outletSales: any[] = [];
  amountSold = 0;
  bottles = 0;
  newRate;
  merchantPro  = [];
  sales = [];

  constructor(public userService: UserServiceService, 
              public outletService: OutletService,
              private distService: DistributionService,
              public modalController: ModalController,
              public alertController: AlertController) { 
                this.searchModel.month = new Date().getMonth() + 1;
                this.searchModel.year = new Date().getFullYear() ;
              }
  searchModel = {
    month: null,
    year : null,
    name : null,
    MerchantCode:'',
    group : null,
    list : [],
    rate : []

  }
  ngOnInit() {
    this.getAllOutlets();
    this.getMonthlyRecord();
  }
  theMonthNavigate($event: NgbDatepickerNavigateEvent) {
    this.amountSold = 0;
    
    this.outletSales = null;
    this.searchModel.month = $event.next.month;
    this.searchModel.year = $event.next.year;
 this.getMonthlyRecord();
   
  }



  changeRate(){
    console.log(this.newRate);
    
    this.outletSales.forEach(element => {
      const ID = element._id;
      const attendant = element.attendant;
      const bottles = element.bottles;
     
      
        this.updateNewRate(ID, attendant, bottles);
    }
    );
    this.customSearch();
  }


  updateNewRate(id, attendant, bottles){
    this.loading = true;
   const newAmount =  this.newRate * bottles/ attendant;
   console.log('new amount ', newAmount);
   const dataBody = { amount : newAmount, id: id, bottles : bottles, rate: this.newRate};
   this.outletService.resetMerchantPrice(dataBody).subscribe(data => {
     console.log(data);
     this.loading = false;
   },
   err=> {
     this.loading = false;
     console.log(err)
   });
  }


  getAllOutlets(){
    this.loading = true;
    this.outletService.getOutletForSupply().subscribe(
      res => {
        this.loading = false; 
        this.allOutlet = res['outlets'];
        console.log(this.allOutlet);
        let outletCode = this.allOutlet.filter(item => item.code);
        console.log('this is ' + outletCode)
        
      },
      err => {
        this.loading = false; this.userService.generalToast(err.error['msg']);
        console.log(err);
      }
    );
  }



  getMonthlyRecord(){
    this.outletService.getMerchantMonthly(this.searchModel).subscribe(data => {
      console.log(data);
      this.merchantPro = data['data'];
    }, err => {
      console.log(err);
    });
  }


  customSearch(){
    this.outletService.findOutletSaleByCode(this.searchModel).subscribe(
      res => {
        this.loading = false;
        console.log(res);
        this.outletSales = res['record'];
        this.outletSales.forEach(element => {
          this.bottles += element.bottles;
          this.amountSold += element.amountSold;
        });
      },
      err => {
        this.loading = false;
        console.log(err);
        this.userService.generalToastSh(err.error.msg);
      }
    );
  }

  modelUser = { name:'', store :'', bottles : null}

  bootleChange(event, data, masterId){
    console.log(data)
    console.log('mastr id',masterId)
    console.log(event.target.value)
    if(event.target.value > 0){
      let bottles = event.target.value;
      data.bottles = event.target.value;
      data.masterId = masterId;
      console.log(data);
      this.outletService.updateBottles(data).subscribe(data => {
        console.log(data);
        
      })
    }
  }



    // async addRecord() {
    //   const modal = await this.modalController.create({
    //   component: AddMerchantProComponent,
    //   componentProps: { allOutlet: this.allOutlet }
    //   });
    
    //   await modal.present();
    
    //   const data = await modal.onDidDismiss();
    //   console.log(data)
    
    // }

async addRecord() {
  const alert = await this.alertController.create({
    header: 'Confirm!',
    message: 'Message <strong>text</strong>!!!',
    inputs:[{name:'name', placeholder: "Enter name"}, {name: "group", placeholder:"enter group"}],
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary',
        handler: () => {
          console.log('Confirm Cancel: blah');
        }
      }, {
        text: 'submit',
        handler: (data) => {
          console.log('Confirm Okay', data);
          this.searchModel.name = data.name;
          this.searchModel.group = data.group;
          this.searchModel.list = this.allOutlet.map(item => item.code);
          this.outletService.submitMerchantPro(this.searchModel).subscribe(res => {
            console.log(res);
            this.merchantPro.push(res['data']);
          }, err => {
            console.log(err);
          })
        }
      }
    ]
  });

  await alert.present();
}

  
}
