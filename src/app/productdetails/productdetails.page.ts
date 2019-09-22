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
    
  let cartin: any = [];
 
   this.storageService.getObject('addtocart').then(cart => {
      if (cart != null){
        if (cart !== ""){
          let arry: any = [];
          for (let prop in cart) {
            arry[prop] =  cart[prop];
          }
          cartin = arry;
          cartin.push(cartvalue);
            }
        else{
          if (cartvalue["name"] !=cart["name"] ){
            cartin.push(cartvalue);
            }
        }  
        }else{
          cartin.push(cartvalue);
        }
            
            for(var i=0;i<cartin.length;i++){
              if(cartin[i].name === cartvalue["name"])
              {  
                cartin[i].status = "Cart";
              }           
            }
    
      this.storageService.setObject('addtocart', cartin);
    });
    
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
