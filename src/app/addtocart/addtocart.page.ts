import { Component, OnInit } from '@angular/core';
import { StorageService } from '../storage.service';
import { ShoppingapiService } from '../services/shoppingapi.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-addtocart',
  templateUrl: './addtocart.page.html',
  styleUrls: ['./addtocart.page.scss'],
})
export class AddtocartPage implements OnInit {

  addtocart: Array <any>;
  disabled = true;
  spinner: boolean =true;

  constructor(public storageService: StorageService,public shoppingservice: ShoppingapiService, private router: Router,public toastController: ToastController) { }

  ngOnInit() {
    this.listcart();
  }
  async presentToast(message) {
    const toast = await this.toastController.create({
     message: message,
     duration: 2000
   });
   toast.present();
 }
 slideOpts = {
   initialSlide: 1,
   speed: 400
 };
  async listcart(){
   
   await this.storageService.getObject('addtocart').then(result => {
      if (result != null) {
          // console.log(arr);

        this.addtocart = result;
       // console.log(result);
       this.spinner = false;
      }else{
        this.addtocart =[];
        this.spinner = false;
      }
      }).catch(e => {
      console.log('error: ', e);
      });
      if(this.addtocart.length > 0){
        this.disabled = false;
      }
      else{
        this.disabled = true;
      }
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
  async placeorder(){
   
    await this.storageService.get('auth').then(result => {
       if (result != null) {
        this.shoppingservice.loginvalidate({'token' : result}).subscribe((res) => {
          let response = JSON.parse(res);
         console.log(response);
         if(response.data.status == 200){
         
          this.presentToast('User validated in successfully');
            
         }
       //  this.router.navigate(['/']);
        },
        (err)=>{
          var resp = JSON.parse(err.error);
          alert(resp.message);
        //  this.router.navigate(['/login']);
        });
        this.spinner = false;
       }
       }).catch(e => {
      //  this.router.navigate(['/login']);
       console.log('error: ', e);
       });
   }
   async addqty(value = []){
    this.spinner = true;
    let qtytotalcost;
  await this.storageService.getObject('addtocart').then(cart => {
      for (let product of cart) {
        if (value["name"] === product.name) {
          //value["product_Status"] = "New";
         // cart.splice(cart.indexOf(product), 1);
         product.qty = value["qty"] +1;
         qtytotalcost = product.price * product.qty;
         product.qtytotalcost = "<ins><span class='woocommerce-Price-amount amount'><span class='woocommerce-Price-currencySymbol'>&#8377;</span>"+qtytotalcost+"</span></ins>";
            break;
        }
      }
      this.storageService.setObject('addtocart', cart);
      this.listcart();
    });
   
  }  
  async removeqty(value = []){
    this.spinner = true;
    let qtytotalcost;
  await this.storageService.getObject('addtocart').then(cart => {
      for (let product of cart) {
        if (value["name"] === product.name) {
         if ( value["qty"] > 1){
          product.qty = value["qty"] - 1;
          qtytotalcost = product.price * product.qty;
          product.qtytotalcost = "<ins><span class='woocommerce-Price-amount amount'><span class='woocommerce-Price-currencySymbol'>&#8377;</span>"+qtytotalcost+"</span></ins>";
            break;
         }else{
           this.removecart(value);
           break;
         }
         
        }
      }
      if(value["qty"] > 1){
        this.storageService.setObject('addtocart', cart);
      }
       this.listcart();
    });
   
  }  
}
