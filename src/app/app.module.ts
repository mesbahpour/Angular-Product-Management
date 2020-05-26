import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CompanyComponent } from './company/company.component';
import { ProductComponent } from './product/product.component';
import { SharedComponent } from './shared/shared.component';
import { ProjectService } from './projectService.service';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { InputFormsComponent } from './input-forms/input-forms.component';

@NgModule({
  declarations: [
    AppComponent,
    CompanyComponent,
    ProductComponent,
    SharedComponent,
    InputFormsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [ProjectService],
  bootstrap: [AppComponent]
})
export class AppModule { }
