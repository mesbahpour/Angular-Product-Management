import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompanyComponent } from './company/company.component';
import { ProductComponent } from './product/product.component';
import { SharedComponent } from './shared/shared.component';


const routes: Routes = [

  { path: '', component: CompanyComponent },
  { path: 'company/:id', component: ProductComponent },
  { path: 'shared', component: SharedComponent },
  { path: '**', redirectTo: '/' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
