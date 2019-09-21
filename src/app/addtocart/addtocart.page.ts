import { Component, OnInit } from '@angular/core';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-addtocart',
  templateUrl: './addtocart.page.html',
  styleUrls: ['./addtocart.page.scss'],
})
export class AddtocartPage implements OnInit {

  addtocart:  any = [];

  constructor(public storageService: StorageService) { }

  ngOnInit() {
    this.storageService.getObject('addtocart').then(result => {
      if (result != null) {
        this.addtocart = result;
        console.table('addtocart: '+ result);
      }
      }).catch(e => {
      console.log('error: ', e);
      });
  }

}
