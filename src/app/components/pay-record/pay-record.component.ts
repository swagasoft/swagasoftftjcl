import { UserServiceService } from './../../shared/user-service.service';
import { PayrollService } from './../../shared/payroll.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pay-record',
  templateUrl: './pay-record.component.html',
  styleUrls: ['./pay-record.component.scss'],
})
export class PayRecordComponent implements OnInit {
loading = false;
allRecord = [];
total : any;
totalPayout = 0;
  constructor( private payService: PayrollService, public userservice:UserServiceService) { }

  ngOnInit() {
  }

  model = {
    search: '',
    department:'',
    month:'',
    year:''
  }

  thisMonthRecord(event){
    this.loading = true;
    this.total = 0;
this.totalPayout = 0;
this.model.month = event.next.month;
this.model.year = event.next.year;
    this.payService.getPayRecord(this.model).subscribe(
      res => {
        this.loading = false;
        this.allRecord = res['record'];
        this.total = this.allRecord.length;
        this.allRecord.forEach((one)=>{
          this.totalPayout += one.AmountPaid;
        });
      },
      err => {
        this.loading = false;
        this.allRecord = [];
        this.userservice.generalToastSh(err.error.msg);
        console.log(err);
      }
    )
  }


  selectDepartment(department){
    this.total = 0;
    this.totalPayout = 0;
    this.model.department = department;
    this.loading = true; 
    this.payService.recordByDepartment(this.model).subscribe(
      res => {
        console.log(res);
        this.loading = false;
        this.allRecord = res['record'];
        this.total = this.allRecord.length;
        this.allRecord.forEach((one)=>{
          this.totalPayout += one.AmountPaid;
        });
      },
      err => {
        this.loading = false;
        this.allRecord = [];
        this.userservice.generalToastSh(err.error.msg);
        console.log(err);
      }
    );
  }

}
