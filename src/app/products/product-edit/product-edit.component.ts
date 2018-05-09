import { Component, OnInit, Input } from '@angular/core';
import { HelperService } from '../../shared-services/helper.service';
import { ProductService } from '../shared/product.service';

import {
  FormControl, ValidationErrors,
  FormGroupDirective, NgForm, Validators, ValidatorFn, FormBuilder, AbstractControl, FormGroup
} from '@angular/forms';
import { TreeComponent } from '../../shared-components/tree/tree.component';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  @Input('tabId')
  tabId: number;
  categoryId;
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
      status: ['', Validators.required],
      productId: null
    });
  }

  ngOnInit() {
    this.getRecordById(this.tabId);
  }


  getRecordById(tabId) {
    this.productService.getProductById(tabId)
      .subscribe(data => {
        console.log(data);
        this.categoryId = data.productCategory.id;
        this.myForm.patchValue({
          productId: data.productId,
          categoryId: data.productCategory.id,
          name: data.name,
          status: data.status
        });
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
    this.productService.updateProduct(value)
      .subscribe(
      (res) => {
        console.log(res);
        this.helperService.openSnackBar('The route has been added!');
      },
      (error) => {
        this.helperService.openSnackBar('There is an error! Please try again!', error);
      }
      );
  }
}
