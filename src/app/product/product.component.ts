import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProjectService } from '../projectService.service';
import { ActivatedRoute } from '@angular/router';
import { CreateProductContrcat } from '../contracts/produtc.contract';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html'
})
export class ProductComponent implements OnInit {

  headers = { title: 'عنوان', mfgDate: 'تاریخ ', status: 'وضعیت' };
  productForm: FormGroup;
  companies;
  products;
  isEmpty = false;
  title = 'لیست  محصولات';
  alert = false;
  submitted = false;
  unSubscribeGetProducts = new Subscription();
  unSubscribeGetCompanies = new Subscription();
  unSubscribeAddProduct= new Subscription();

  constructor(private projectService: ProjectService, private route: ActivatedRoute) {
    this.productForm = new FormGroup({
      title: new FormControl(null, Validators.required),
      companyId: new FormControl(this.route.snapshot.params['id']),
      mfgDate: new FormControl('1399-03-05', Validators.required),
      status: new FormControl('فعال', Validators.required),
    });
  }

  ngOnInit(): void {
    this.retrieveAllproduct();
  }


  retrieveAllproduct() {
  this.unSubscribeGetProducts=  this.projectService.retrieveAllProducts().subscribe((res: any) => {
    //search products
      this.products = res.filter(product => product.companyId == this.route.snapshot.params['id']);

      //hide companyId and id keys in table
      this.products.forEach(element => {
        delete element['companyId'];
        delete element['id'];
      });

      this.isEmpty = this.products.length < 1 ? true : false;
      
    }, error => {
      console.log(error)
    });
  }


  submit() {
    this.submitted = true;

    const createProduct = {
      title: this.productForm.value.title,
      companyId: this.route.snapshot.params['id'],
      mfgDate: this.productForm.value.mfgDate,
      status: this.productForm.value.status
    } as CreateProductContrcat

    if (this.productForm.valid) {
      this.unSubscribeAddProduct=  this.projectService.addProduct(createProduct).subscribe(res => {
        this.products = res;
        this.onReset();
        this.retrieveAllproduct();
        this.alert = true;
        setTimeout(() => {
          this.alert = false;
        }, 2000);

      }, error => {
        console.log(error);
      });
    }
  }

  retrieveAllCompanies() {
    this.unSubscribeGetCompanies=  this.projectService.retrieveAllCompanies().subscribe(res => {
      this.companies = res;
    }, error => {
      console.log(error)
    });
  }

  onReset() {
    this.submitted = false;
    this.productForm.reset()
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
