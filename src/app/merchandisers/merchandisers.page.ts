import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-merchandisers',
  templateUrl: './merchandisers.page.html',
  styleUrls: ['./merchandisers.page.scss'],
})
export class MerchandisersPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  dateSelected(event){
    console.log(event);
  }

}
