import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-input-forms',
  templateUrl: './input-forms.component.html',
  styleUrls: ['./input-forms.component.scss'],
})
export class InputFormsComponent implements OnInit {
  form: FormGroup;
  @Input() formDataObj;
  dataProps = [];
  constructor() {}

  ngOnInit() {
    const formDataObj = {};
    for (const prop of Object.keys(this.formDataObj)) {
      formDataObj[prop] = new FormControl(
        this.formDataObj[prop].value,
        this.mapValidator(this.formDataObj[prop].validation)
      );

      this.dataProps.push({
        key: prop,
        label: this.formDataObj[prop].label,
        type: this.formDataObj[prop].type,
        options: this.formDataObj[prop].options,
      });
    }

    this.form = new FormGroup(formDataObj);
  }

  mapValidator(validators) {
    console.log(validators);
    if (validators) {
      return Object.keys(validators).map((validationType) => {
        if (validationType === 'required') {
          return Validators.required;
        } else if (validationType === 'min') {
          return Validators.min(validators[validationType]);
        }
      });
    } else {
      return [];
    }
  }
}
