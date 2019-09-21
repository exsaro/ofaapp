import { Injectable } from '@angular/core';
// import WooCommerceRestApi from '@woocommerce/woocommerce-rest-api';
import { HttpClient, HttpResponse, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ShoppingapiService {

  
  
  constructor(private http: HttpClient) { }

    url = 'https://www.softwebsystems.com/ofa/'; // Your store URL
    consumerKey = 'ck_6ae751f70b993795144aa67a1e1b6dae6cf89b6a'; // Your consumer key
    consumerSecret = 'cs_b8f40500f0a6056af076aaf06962b8a5af6e8cc4'; // Your consumer secret
    version = 'wc/v3'; // WooCommerce WP REST API version
    queryStringAuth = true;

    getAllProducts(){
      return this.http.get(`${this.url}/wp-json/wc/v3/products?consumer_key=${this.consumerKey}&consumer_secret=${this.consumerSecret}`);
    }

    getAllCategories(){
      // tslint:disable-next-line:max-line-length
      return this.http.get(`${this.url}/wp-json/wc/v3/products/categories?consumer_key=${this.consumerKey}&consumer_secret=${this.consumerSecret}`);
    }

    getProduct(id){
      return this.http.get(`${this.url}/wp-json/wc/v3/products/${id}?consumer_key=${this.consumerKey}&consumer_secret=${this.consumerSecret}`);
    }

  }
