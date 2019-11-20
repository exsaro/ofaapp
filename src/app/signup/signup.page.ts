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

  uploadForm: any;
    constructor(private formBuilder: FormBuilder, public shoppingservice: ShoppingapiService,
     private router: Router,
     private activeRoute: ActivatedRoute,
     public storageService: StorageService,
     public toastController: ToastController) {

  
      }
      signupfrm: FormGroup;
  ngOnInit() {
    this.signupfrm = this.formBuilder.group({
      fname: ['', [Validators.required]],
      lname: ['', [Validators.required]],
      mobile: ['', [Validators.required,Validators.pattern(/^(\+)?\d+$/)]],
      email: ['', [Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      pwd:  ['', [Validators.required]]
    });
  }
  onSubmit() {
     console.log(this.signupfrm.value["fname"]);
let obj ={
  email : this.signupfrm.value["email"],
  first_name : this.signupfrm.value["fname"],
  last_name : this.signupfrm.value["lname"],
  username : this.signupfrm.value["email"],
  password : this.signupfrm.value["pwd"],
  billing: {
    email : this.signupfrm.value["email"],
    phone :  this.signupfrm.value["mobile"]
  }
 };
  this.shoppingservice.usersignup(obj).subscribe((res) => {
    var res1 = res.split("</body>");
  console.log(JSON.parse(res1[1]));
  this.presentToast('Registration success')
  this.router.navigate(['/login']);
  },
  (err)=>{
    var resp = JSON.parse(err.error);
    this.presentToast(resp.message)
    this.signupfrm.reset();
  });
  }
  async presentToast(message) {
    const toast = await this.toastController.create({
     message: message,
     duration: 4000
   });
   toast.present();
 }
 slideOpts = {
   initialSlide: 1,
   speed: 400
 };

}
