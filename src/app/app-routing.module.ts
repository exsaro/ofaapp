import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path: 'productlist', loadChildren: './productlist/productlist.module#ProductlistPageModule' },
  { path: 'addtocart', loadChildren: './addtocart/addtocart.module#AddtocartPageModule' },
  { path: 'searchresult', loadChildren: './searchresult/searchresult.module#SearchresultPageModule' },
  { path: 'productdetails/:id', loadChildren: './productdetails/productdetails.module#ProductdetailsPageModule' },
];

@NgModule({
  
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
