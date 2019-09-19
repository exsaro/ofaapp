import { Component, OnInit } from '@angular/core';
import { ShoppingapiService } from '../services/shoppingapi.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.page.html',
  styleUrls: ['./productdetails.page.scss'],
})
export class ProductdetailsPage implements OnInit {

  constructor( private shoppingservice: ShoppingapiService, private router: Router, private activeRoute: ActivatedRoute) { }

  id: number;
  product: any;
  

  ngOnInit() {
    
    this.activeRoute.params.subscribe(routeParams => {
      this.id = routeParams.id;
    });

    this.shoppingservice.WooCommerce.get(`products/${this.id}`)
    .then((response) => {
      this.product = response.data;
      console.log(this.product.name);
    })
    

  }

}
