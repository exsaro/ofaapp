import { Component, OnInit } from '@angular/core';
import { ShoppingapiService } from '../services/shoppingapi.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.page.html',
  styleUrls: ['./productlist.page.scss'],
})
export class ProductlistPage implements OnInit {
  selected_cate:any;
  productList: any = [];
  categories: any = [];
  spinner :boolean = true;
  content :boolean = false;
  catemodel:any;
  constructor( public shoppingservice: ShoppingapiService, private router: Router) { }

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
