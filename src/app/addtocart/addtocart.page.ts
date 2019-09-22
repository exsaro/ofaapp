import { Component, OnInit } from '@angular/core';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-addtocart',
  templateUrl: './addtocart.page.html',
  styleUrls: ['./addtocart.page.scss'],
})
export class AddtocartPage implements OnInit {

  addtocart: Array <any>;

  constructor(public storageService: StorageService) { }

  ngOnInit() {
    this.listcart();
  }
  listcart(){
    this.storageService.getObject('addtocart').then(result => {
      if (result != null) {
          // console.log(arr);

        this.addtocart = result;
       // console.log(result);
      }
      }).catch(e => {
      console.log('error: ', e);
      });
  }
  removecart(value = []){
   this.storageService.getObject('addtocart').then(cart => {
      for (let product of cart) {
        if (value["name"] === product.name) {
          //value["product_Status"] = "New";
          cart.splice(cart.indexOf(product), 1);
            break;
        }
      }
      this.storageService.setObject('addtocart', cart);
      this.listcart();
    });
   
  }  
}
