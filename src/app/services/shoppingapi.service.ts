import { Injectable } from '@angular/core';
// import WooCommerceRestApi from '@woocommerce/woocommerce-rest-api';
import { HttpClient, HttpResponse, HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';
import { HttpserviceService } from './httpservice.service';
@Injectable({
  providedIn: 'root'
})
export class ShoppingapiService {



  constructor(private http: HttpClient, private httpservice: HttpserviceService, private route: Router) { }

    url = 'https://www.softwebsystems.com/ofa'; // Your store URL
    consumerKey = 'ck_6ae751f70b993795144aa67a1e1b6dae6cf89b6a'; // Your consumer key
    consumerSecret = 'cs_b8f40500f0a6056af076aaf06962b8a5af6e8cc4'; // Your consumer secret
    version = 'wc/v3'; // WooCommerce WP REST API version
    queryStringAuth = true;
    
    usersignup(data){
      console.log(data);
      return this.httpservice.post(`${this.url}/wp-json/wc/v3/customers?consumer_key=${this.consumerKey}&consumer_secret=${this.consumerSecret}`,JSON.stringify(data));
     //return this.http.post('https://httpbin.org/post',JSON.stringify(data));
    }

    getAllProducts(categories) {
      return this.http.get(`${this.url}/wp-json/wc/v3/products?category=${categories}&consumer_key=${this.consumerKey}&consumer_secret=${this.consumerSecret}`);
    }

    getAllCategories() {
      // tslint:disable-next-line:max-line-length
      return this.http.get(`${this.url}/wp-json/wc/v3/products/categories?consumer_key=${this.consumerKey}&consumer_secret=${this.consumerSecret}`);
    }

    getProduct(id) {
      // tslint:disable-next-line:max-line-length
      return this.http.get(`${this.url}/wp-json/wc/v3/products/${id}?consumer_key=${this.consumerKey}&consumer_secret=${this.consumerSecret}`);
    }

    navigateCart() {
      this.route.navigate(['/addtocart']);
    }

    navigateContact() {
      this.route.navigate(['/contact']);
    }

    navigateSettings() {
      this.route.navigate(['/setting']);
    }

    navigateLogin(){
      this.route.navigate(['/login']);
    }

  }
