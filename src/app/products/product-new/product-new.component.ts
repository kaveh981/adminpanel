import { Component, OnInit } from '@angular/core';
import { HelperService } from '../../shared-services/helper.service';
import { ProductService } from '../shared/product.service';

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
export class ProductNewComponent {

  isLinear = false;
  myForm: FormGroup;
  statuses = [
    { key: 'active', value: 0 },
    { key: 'inactive', value: 1 },
    { key: 'deleted', value: 2 }
  ];

  constructor(
    private productService: ProductService,
    private fb: FormBuilder,
    private helperService: HelperService
  ) {
    this.myForm = fb.group({
      categoryId: ['', Validators.required],
      name: ['', Validators.required],
      status: ['', Validators.required]
    });
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
    this.productService.postProduct(value)
      .subscribe(
      (res) => {
        this.helperService.openSnackBar('The route has been added!');
      },
      (error) => {
        this.helperService.openSnackBar('There is an error! Please try again!', error);
      }
      );
  }
}
