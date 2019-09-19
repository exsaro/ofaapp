import { Component, OnInit } from '@angular/core';
import { ShoppingapiService } from '../services/shoppingapi.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.page.html',
  styleUrls: ['./productlist.page.scss'],
})
export class ProductlistPage implements OnInit {

  productList: any = [];

  constructor( private shoppingservice: ShoppingapiService, private router: Router) { }

  getProducts(product){
    console.log(product);
    this.router.navigate(['/productdetails',product.id]);
  }

  ngOnInit() {
    this.shoppingservice.WooCommerce.get('products')
    .then((response) => {
      this.productList = response.data;
      console.log(this.productList);
    })
    .catch((error) => {
      console.log(error.response.data);
    });
  }

}
