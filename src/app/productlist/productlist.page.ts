import { Component, OnInit } from '@angular/core';
import { ShoppingapiService } from '../services/shoppingapi.service';
import { Router, ActivatedRoute } from '@angular/router';
import { StorageService } from '../storage.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.page.html',
  styleUrls: ['./productlist.page.scss'],
})
export class ProductlistPage implements OnInit {
  user_name ="";
  selected_cate:any;
  productList: any = [];
  categories: any = [];
  spinner :boolean = true;
  content :boolean = false;
  catemodel:any;
  constructor( public shoppingservice: ShoppingapiService, private router: Router,private activeRoute: ActivatedRoute, public storageService: StorageService, public toastController: ToastController) { }

  getProducts(product) {
    this.router.navigate(['/productdetails', product.id]);
  }
  
  segmentButtonClicked(ev:any,categories){
    this.spinner = true;
    this.content = false;
    this.getproducts(categories.id);
    this.selected_cate = categories.name;
  }
  getproducts(categories){
    this.shoppingservice.getAllProducts(categories).subscribe((res)=>{
      console.log(categories)
      this.productList = res;
      console.log(res);
      this.spinner = false;
      this.content = true;
    });
   
    
  }
  ngOnInit() {
     this.storageService.get('auth').then(result => {
      if (result != null) {
       this.shoppingservice.loginvalidate({'token' : result}).subscribe((res) => {
         let response = JSON.parse(res);
           if(response.data.status == 200){
          this.storageService.getObject('profile').then(profile => {
            if(profile !=null){
              this.user_name =profile.user_display_name;
            }else{
              this.user_name = "Guest";
            }

          })
         
          }
       })
      }else{
        this.user_name = "Guest";
      }
      }).catch(e => {
        this.user_name = "Guest";
     console.log(e);
      });
    this.shoppingservice.getAllCategories().subscribe((res)=>{
      this.categories = res;
      const categories = res[0].id;
      this.selected_cate = res[0].name;
      this.catemodel = res[0].id
      console.log(res);
      this.getproducts(categories);
    });
    //   this.spinner = false;
       // this.shoppingservice.WooCommerce.get('products')
    // .then((response) => {
    //   this.productList = response.data;
    //   console.log(this.productList);
    // })
    // .catch((error) => {
    //   console.log(error.response.data);
    // });

    // this.shoppingservice.WooCommerce.get('products/categories')
    // .then((response) => {
    //   this.categories = response.data;
    //   console.log(this.categories);
    // })
    // .catch((error) => {
    //   console.log(error.response.data);
    // });

  }

}
