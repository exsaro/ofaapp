import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ShoppingapiService } from '../services/shoppingapi.service';
import { Router, ActivatedRoute } from '@angular/router';
import { StorageService } from '../storage.service';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
signupfrm: FormGroup;
  uploadForm: any;
    constructor(private formBuilder: FormBuilder, public shoppingservice: ShoppingapiService,
     private router: Router,
     private activeRoute: ActivatedRoute,
     public storageService: StorageService,
     public toastController: ToastController) {

  
      }

  ngOnInit() {
    this.signupfrm = this.formBuilder.group({
      fname:  ['', [Validators.required]],
      lname: ['', [Validators.required]],
      mobile: ['', [Validators.required]],
      email: ['', [Validators.required]],
      pwd:  ['', [Validators.required]]
    });
  }
  onSubmit() {
     console.log(this.signupfrm.value["fname"]);
let obj ={
  // email : this.signupfrm.value["email"],
  // first_name : this.signupfrm.value["fname"],
  // last_name : this.signupfrm.value["lname"],
  // username : this.signupfrm.value["email"],
  // password : this.signupfrm.value["pwd"],
  // billing: {
  //   email : this.signupfrm.value["email"],
  //   phone :  this.signupfrm.value["mobile"]
  // }
  "email":"hari@sis.in",
};
  this.shoppingservice.usersignup(obj).subscribe((res) => {
console.log(res);
  },
  (err)=>{
    console.log(err);
  });
  }
  id(id: any) {
    throw new Error("Method not implemented.");
  }

}
