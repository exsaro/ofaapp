import { Component, OnInit } from '@angular/core';
import { ShoppingapiService } from '../services/shoppingapi.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.page.html',
  styleUrls: ['./productdetails.page.scss'],
})
export class ProductdetailsPage implements OnInit {
  id: number;
  product: any = [];
   constructor( private shoppingservice: ShoppingapiService, private router: Router, private activeRoute: ActivatedRoute) {


  }


  ngOnInit() {

   this.activeRoute.params.subscribe(routeParams => {
    this.id = routeParams.id;
    this.shoppingservice.getProduct(this.id).subscribe((res)=>{
      this.product = res;
    });
    // this.shoppingservice.WooCommerce.get(`products/${this.id}`)
    // .then((response) => {
    //   this.product = response.data;
    //  })
    // .catch((error) => {
    //   console.log(error.response.data);
    // });
  });
  }
  addtocart(cartvalue) {
    localStorage.setItem('cart', cartvalue);
    console.table(cartvalue);
  }
}
