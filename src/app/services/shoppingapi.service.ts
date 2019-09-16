import { Injectable } from '@angular/core';
import WooCommerceRestApi from '@woocommerce/woocommerce-rest-api';

@Injectable({
  providedIn: 'root'
})
export class ShoppingapiService {

  constructor() { }

  WooCommerce = new WooCommerceRestApi({
    url: 'https://www.softwebsystems.com/ofa/', // Your store URL
    consumerKey: 'ck_6ae751f70b993795144aa67a1e1b6dae6cf89b6a', // Your consumer key
    consumerSecret: 'cs_b8f40500f0a6056af076aaf06962b8a5af6e8cc4', // Your consumer secret
    version: 'wc/v3', // WooCommerce WP REST API version
    queryStringAuth: true
  });

   getAllProducts() {
    this.WooCommerce.get('products')
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error.response.data);
    });
   }


   
}
