import { Component, OnInit } from '@angular/core';
import { ShoppingapiService } from '../services/shoppingapi.service';
import {StorageService } from '../storage.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
user_name = "";
  constructor( public shoppingservice: ShoppingapiService , public storageService: StorageService ) { }

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
  }

}
