import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CreateCompanyContrcat } from './contracts/company.contract';
import { CreateProductContrcat } from './contracts/produtc.contract';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(private http: HttpClient) {}

  API_URL = 'http://localhost:3000/';

  retrieveAllCompanies() {
    return this.http.get(this.API_URL + 'company/');
  }

  addCompany(createCompany: CreateCompanyContrcat) {
    return this.http.post(this.API_URL + 'company/', createCompany);
  }

  retrieveAllProducts() {
    return this.http.get(this.API_URL + 'product/');
  }

  addProduct(createProduct: CreateProductContrcat) {
    return this.http.post(this.API_URL + 'product/', createProduct);
  }
}
