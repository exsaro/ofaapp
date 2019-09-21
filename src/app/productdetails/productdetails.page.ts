import { Component, OnInit } from '@angular/core';
import { ShoppingapiService } from '../services/shoppingapi.service';
import { Router, ActivatedRoute } from '@angular/router';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.page.html',
  styleUrls: ['./productdetails.page.scss'],
})
export class ProductdetailsPage implements OnInit {
  id: number;
  product: any = [];
   constructor(
     public shoppingservice: ShoppingapiService,
     private router: Router,
     private activeRoute: ActivatedRoute,
     public storageService: StorageService) {


  }

  addtocart(cartvalue) {
    const obj = {
      id : cartvalue.id,
      name : cartvalue.name
    };
    this.storageService.setObject('addtocart', obj);
  }


  ngOnInit() {

   this.activeRoute.params.subscribe(routeParams => {
    this.id = routeParams.id;
    this.shoppingservice.getProduct(this.id).subscribe((res) => {
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

}
