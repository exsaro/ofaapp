import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ShoppingapiService } from '../services/shoppingapi.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { StorageService } from '../storage.service';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private formBuilder: FormBuilder, public shoppingservice: ShoppingapiService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    public storageService: StorageService,
    public toastController: ToastController) { }
    loginfrm: FormGroup;
  ngOnInit() {
    this.loginfrm = this.formBuilder.group({
      email: ['', [Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      pwd:  ['', [Validators.required]]
    });
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
  onLogin() {
  let obj ={
username : this.loginfrm.value["email"],
 password : this.loginfrm.value["pwd"],
};
this.shoppingservice.userlogin(obj).subscribe((res) => {
  let response = JSON.parse(res);
 console.log(response.token);
this.storageService.set('auth',response.token);
this.presentToast('User logged in successfully');
this.loginfrm.reset();
this.router.navigate(['/profile']);
},
(err)=>{
  var resp = JSON.parse(err.error);
  alert(resp.message);
  this.loginfrm.reset();
});
}
async getlogin(){
  await this.storageService.get('auth').then(result => {
    if (result != null) {
console.log(result);
    }
    }).catch(e => {
    console.log('error: ', e);
    });
}
}
