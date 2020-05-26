import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProjectService } from '../projectService.service';
import { ActivatedRoute } from '@angular/router';
import { CreateProductContrcat } from '../contracts/produtc.contract';
import { Subscription } from 'rxjs';
import { InputFormsComponent } from '../input-forms/input-forms.component';
import { Product } from '../form-fields/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
})
export class ProductComponent implements OnInit {
  product;
  headers = { title: 'عنوان', mfgDate: 'تاریخ ', status: 'وضعیت' };
  companies;
  products;
  isEmpty = false;
  title = 'لیست  محصولات';
  alert = false;
  unSubscribeGetProducts = new Subscription();
  unSubscribeGetCompanies = new Subscription();
  unSubscribeAddProduct = new Subscription();
  data;

  @ViewChild(InputFormsComponent) child;

  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute
  ) {
    this.product = Product;
  }

  ngOnInit(): void {
    this.retrieveAllproduct();
  }

  retrieveAllproduct() {
    this.unSubscribeGetProducts = this.projectService
      .retrieveAllProducts()
      .subscribe(
        (res: any) => {
          //search products
          this.products = res.filter(
            (product) => product.companyId == this.route.snapshot.params['id']
          );

          //hide companyId and id keys in table
          this.products.forEach((element) => {
            delete element['companyId'];
            delete element['id'];
          });

          this.isEmpty = this.products.length < 1 ? true : false;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  submit() {
    this.data = this.child.form;

    const createProduct = {
      title: this.data.value.title,
      companyId: this.route.snapshot.params['id'],
      mfgDate: this.data.value.mfgDate,
      status: this.data.value.status,
    } as CreateProductContrcat;

    if (this.data.valid) {
      this.unSubscribeAddProduct = this.projectService
        .addProduct(createProduct)
        .subscribe(
          (res) => {
            this.products = res;
            this.data.reset();
            this.retrieveAllproduct();
            this.alert = true;
            setTimeout(() => {
              this.alert = false;
            }, 2000);
          },
          (error) => {
            console.log(error);
          }
        );
    }
  }

  retrieveAllCompanies() {
    this.unSubscribeGetCompanies = this.projectService
      .retrieveAllCompanies()
      .subscribe(
        (res) => {
          this.companies = res;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  ngOnDestroy(): void {
    this.unSubscribeGetProducts.unsubscribe();
    this.unSubscribeGetProducts = null;

    this.unSubscribeGetCompanies.unsubscribe();
    this.unSubscribeGetCompanies = null;

    this.unSubscribeAddProduct.unsubscribe();
    this.unSubscribeAddProduct = null;
  }
}
