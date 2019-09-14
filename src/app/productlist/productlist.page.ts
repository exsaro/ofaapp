import { Component, OnInit } from '@angular/core';
import { ShoppingapiService } from '../services/shoppingapi.service';

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.page.html',
  styleUrls: ['./productlist.page.scss'],
})
export class ProductlistPage implements OnInit {

  constructor( private shoppingservice: ShoppingapiService) { }

  getProducts(){
    this.shoppingservice.getAllProducts();
  }

  ngOnInit() {
  }

}
