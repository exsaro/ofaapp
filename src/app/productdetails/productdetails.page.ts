import { Component, OnInit } from '@angular/core';
import { ShoppingapiService } from '../services/shoppingapi.service';
import { Router, ActivatedRoute } from '@angular/router';
import { StorageService } from '../storage.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.page.html',
  styleUrls: ['./productdetails.page.scss'],
})
export class ProductdetailsPage implements OnInit {
  id: number;
  product: any = [];
  spinner :boolean = true;
  content :boolean = false;
   constructor(
     public shoppingservice: ShoppingapiService,
     private router: Router,
     private activeRoute: ActivatedRoute,
     public storageService: StorageService,
     public toastController: ToastController) {


  }

  async addtocart(cartvalue) {
  //  this.spinner = true;
  try {

  let cartin: any = [];
 
 await this.storageService.getObject('addtocart').then(cart => {
      if (cart != null){
     
          let arry: any = [];
          for (let prop in cart) {
            if(cart[prop].id != cartvalue.id){
            arry[prop] =  cart[prop];
          }
          else{
            this.presentToast("Already Added");
            return false;
          }
          }
          console.log(arry);
          cartin = arry;
          cartin.push(cartvalue);
            
        // else{
        //   if (cartvalue["name"] !=cart["name"] ){
        //     cartin.push(cartvalue);
        //     }
        // }  
        }else{
          cartin.push(cartvalue);
        }
            
            // for(var i=0;i<cartin.length;i++){
            //   if(cartin[i].name === cartvalue["name"])
            //   {  
            //     cartin[i].status = "Cart";
            //   }           
            // }
    
      this.storageService.setObject('addtocart', cartin);
    //  this.spinner = false;
      this.presentToast("Added to cart!");
    });
    } catch (reason) {
      console.log(reason);
      return false;
    } 
  }
  async presentToast(message) {
     const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }



  ngOnInit() {

   this.activeRoute.params.subscribe(routeParams => {
    this.id = routeParams.id;
    this.shoppingservice.getProduct(this.id).subscribe((res) => {
      this.product = res;
      this.spinner = false;
      this.content =true;
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
