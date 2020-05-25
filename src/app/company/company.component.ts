import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProjectService } from '../projectService.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SharedComponent } from '../shared/shared.component';
import { Router } from '@angular/router';
import { CreateCompanyContrcat } from '../contracts/company.contract';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html'
})
export class CompanyComponent extends SharedComponent implements OnInit, OnDestroy {


  headers = { name: 'نام', phone: 'تلفن', type: 'نوع' };
  companyForm: FormGroup;
  isEmpty = false;
  title: string = 'لیست کمپانی ها';
  alert: boolean = false;
  submitted = false;
  companies;
  unSubscribeAddCompany = new Subscription();
  unSubscribeGetCompanies = new Subscription();
  electronicDevices=['لوازم الکترونیکی','محصولات غذایی','لوازم خانگی'];
  constructor(public projectService: ProjectService, public router: Router) {
    super(router, projectService);
    this.companyForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      phone: new FormControl(null, Validators.required),
      type: new FormControl('لوازم الکترونیکی', Validators.required),
    });
  }

  ngOnInit() {
    this.retrieveAllCompanies();
  }

  retrieveAllCompanies() {
    this.unSubscribeGetCompanies = this.projectService.retrieveAllCompanies().subscribe(res => {
      this.companies = res;
      this.isEmpty = this.companies.length < 1 ? true : false;
      this.companies.forEach(element => {
        delete element['companyId'];
      });
    }, error => {
      console.log(error)
    });
  }

  submit() {
    this.submitted = true;

    const createCompany = {
      name: this.companyForm.value.name,
      phone: this.companyForm.value.phone,
      type: this.companyForm.value.type,
    } as CreateCompanyContrcat;

    if (this.companyForm.valid) {

      this.unSubscribeAddCompany =

        this.projectService.addCompany(createCompany).subscribe(res => {
          this.companies = res;
          this.retrieveAllCompanies();
          this.onReset();
          this.alert = true;
          setTimeout(() => {
            this.alert = false;
          }, 2000);

        }, error => {
          console.log(error)
        });
    }
  }

  onReset() {
    this.submitted = false;
    this.companyForm.reset()
  }

  ngOnDestroy(): void {
    this.unSubscribeAddCompany.unsubscribe();
    this.unSubscribeAddCompany = null;

    this.unSubscribeGetCompanies.unsubscribe();
    this.unSubscribeGetCompanies = null;
  }

}
