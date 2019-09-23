import { Component, OnInit } from '@angular/core';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-addtocart',
  templateUrl: './addtocart.page.html',
  styleUrls: ['./addtocart.page.scss'],
})
export class AddtocartPage implements OnInit {

  addtocart: Array <any>;
  spinner: boolean =true;
  constructor(public storageService: StorageService) { }

  ngOnInit() {
    this.listcart();
  }
  async listcart(){
   
   await this.storageService.getObject('addtocart').then(result => {
      if (result != null) {
          // console.log(arr);

        this.addtocart = result;
       // console.log(result);
       this.spinner = false;
      }
      }).catch(e => {
      console.log('error: ', e);
      });
  }
  async removecart(value = []){
    this.spinner = true;
  await this.storageService.getObject('addtocart').then(cart => {
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
