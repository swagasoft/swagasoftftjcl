import { UserServiceService } from 'src/app/shared/user-service.service';
import { PayrollService } from './../../shared/payroll.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonRefresher } from '@ionic/angular';
import { StaffService } from 'src/app/shared/staff.service';

@Component({
  selector: 'app-payout',
  templateUrl: './payout.component.html',
  styleUrls: ['./payout.component.scss'],
})
export class PayoutComponent implements OnInit {
  @ViewChild('refresherRef', {static : false}) refresherRef: IonRefresher;
allPayout = [];
loading = true;
totalSalary = 0 
totalStaff = 0;

  constructor(private payrollService: PayrollService,
              public staffService: StaffService,
              public userService: UserServiceService) { 
    this.getAllPayOut();
    console.log('fire payout')
  }

  
  model = {
    search: '',
    department:''
  }

  ngOnInit() {}

  doRefresh(event){
    this.loading = true;
    this.getAllPayOut();
    this.loading = false;
  }

  getAllPayOut(){
    this.totalSalary = 0;
    this.totalStaff = 0;
    this.payrollService.getAllStaffPayout().subscribe(
      res=> {
        console.log(res);
        this.loading = false;
        this.refresherRef.complete();
        this.allPayout = res['payout'];
        this.totalStaff = this.allPayout.length;
        this.allPayout.forEach((one)=>{
          this.totalSalary += one.AmountPaid;
        });
      },
      err => {
        this.loading = false;
        this.refresherRef.complete();
        this.userService.generalToastSh(err.error.msg);
        console.log(err);
      }
    )
  }

  selectCategory(cat){
    console.log('cat')
    this.totalSalary = 0;
    this.totalStaff = 0;
    this.loading = true; 
    this.staffService.getPayoutByDepartment(cat).subscribe(
      res => {
        console.log(res);
        this.loading = false;
        this.allPayout = res['staff'];
        this.totalStaff = this.allPayout.length;
        this.allPayout.forEach((one)=>{
          this.totalSalary += one.AmountPaid;
        });
      },
      err => {
        this.loading = false;
        console.log(err);
      }
    );
  }
}
