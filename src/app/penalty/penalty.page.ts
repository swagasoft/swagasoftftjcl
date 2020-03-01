import { StaffService } from './../shared/staff.service';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { IonRefresher } from '@ionic/angular';

@Component({
  selector: 'app-penalty',
  templateUrl: './penalty.page.html',
  styleUrls: ['./penalty.page.scss'],
})
export class PenaltyPage implements OnInit, OnDestroy {
  @ViewChild('refresherRef', {static : false}) refresherRef: IonRefresher;
penalize = [];
loading = false;
  constructor(private staffService: StaffService) {
    this.getAll();
   }

  ngOnInit() {
  }

  ngOnDestroy(){
    this.penalize = [];
  }

  doRefresh(event){
    this.loading = true;
      this.getAll();
      this.loading = false;
  }

  getAll() {
    this.loading = true;
    this.staffService.getAllPenalty().subscribe(
      res => {
        this.loading = false;
        console.log(res);
        this.penalize = res['users'];
        this.refresherRef.complete();
      },
      err => {
        this.loading = false;
        this.refresherRef.complete();
        console.log(err);
      }
    )
  }

}
