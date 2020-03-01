import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fruit',
  templateUrl: './fruit.page.html',
  styleUrls: ['./fruit.page.scss'],
})
export class FruitPage implements OnInit {

  constructor() { }
fruitModel = {
  description:'',
  size:'',
  quantity:'',
  damage:'',
  amount: '',
  suplier:'',
}

  model = {
    filterOptions:''
  }

  ngOnInit() {
  }

  selectChange(event){
    console.log(event);
  
  
  }


}
