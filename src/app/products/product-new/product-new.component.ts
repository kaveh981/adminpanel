import { Component, OnInit } from '@angular/core';

import {
  FormControl, ValidationErrors,
  FormGroupDirective, NgForm, Validators, ValidatorFn, FormBuilder, AbstractControl, FormGroup
} from '@angular/forms';
import { TreeComponent } from '../../shared-components/tree/tree.component';

@Component({
  selector: 'app-product-new',
  templateUrl: './product-new.component.html',
  styleUrls: ['./product-new.component.css']
})
export class ProductNewComponent implements OnInit {

  isLinear = false;
  myForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.myForm = fb.group({
      category: ['', Validators.required]
    });
  }

  ngOnInit() {

  }

  onFocus(e) {
    console.log(e.node);
    this.recurse(e.node.parent);
  }

  recurse(e) {
    if (e && e !== null && e.data && e.data.name) {
      console.log(e.data.name);
      return this.recurse(e.parent);
    }
    // return console.log(e.data.name);
  }

  submitForm(value: any): void {
    console.log(value);
  }
}
