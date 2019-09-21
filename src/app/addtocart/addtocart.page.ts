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
    this.storageService.getObject('addtocart').then(result => {
      if (result != null) {
        const arr = [];
        // tslint:disable-next-line: only-arrow-functions
        Object.keys(result).map(function(key) {
            arr.push({[key]: result[key]});
            return arr;
        });
        console.log(arr);

        this.addtocart = arr;
        console.log(result);
      }
      }).catch(e => {
      console.log('error: ', e);
      });
  }

}
