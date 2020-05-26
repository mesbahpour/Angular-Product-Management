import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ProjectService } from '../projectService.service';
import { Router } from '@angular/router';
import { CreateCompanyContrcat } from '../contracts/company.contract';
import { Subscription } from 'rxjs';
import { InputFormsComponent } from '../input-forms/input-forms.component';
import  {Company} from '../form-fields/company';


@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
})
export class CompanyComponent implements OnInit, OnDestroy {

  @ViewChild(InputFormsComponent) child;

  headers = { name: 'نام', phone: 'تلفن', type: 'نوع' };
  isEmpty = false;
  title: string = 'لیست کمپانی ها';
  alert: boolean = false;
  companies;
  unSubscribeAddCompany = new Subscription();
  unSubscribeGetCompanies = new Subscription();
  companyFormData;
  data;
  company;
  constructor(public projectService: ProjectService, public router: Router) {
    this.companyFormData = Company;
  }

  ngOnInit() {
    this.retrieveAllCompanies();
  }

  retrieveAllCompanies() {
    this.unSubscribeGetCompanies = this.projectService
      .retrieveAllCompanies()
      .subscribe(
        (res) => {
          this.companies = res;
          this.isEmpty = this.companies.length < 1 ? true : false;
          this.companies.forEach((element) => {
            delete element['companyId'];
          });
        },
        (error) => {
          console.log(error);
        }
      );
  }

  submit() {
    this.data = this.child.form;

    const createCompany = {
      name: this.data.value.name,
      phone: this.data.value.phone,
      type: this.data.value.type,
    } as CreateCompanyContrcat;

    this.unSubscribeAddCompany = this.projectService
      .addCompany(createCompany)
      .subscribe(
        (res) => {
          this.companies = res;
          this.retrieveAllCompanies();
          this.data.reset();
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

  ngOnDestroy(): void {
    this.unSubscribeAddCompany.unsubscribe();
    this.unSubscribeAddCompany = null;

    this.unSubscribeGetCompanies.unsubscribe();
    this.unSubscribeGetCompanies = null;
  }
}
