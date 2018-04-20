import { Component, OnInit, ViewChild, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { HelperService } from '../../shared-services/helper.service';
import { ProductService } from '../../products/shared/product.service';
import { TreeComponent as AngularTreeComponent, ITreeOptions } from 'angular-tree-component';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const customValueProvider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => TreeComponent),
  multi: true
};

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css'],
  providers: [customValueProvider]
})
export class TreeComponent implements ControlValueAccessor {

  @Input() label: string;
  @Input() treeName: string;

  @ViewChild(AngularTreeComponent)
  private tree: AngularTreeComponent;
  options = [];
  pathMap = [];
  value = '';
  name = '';

  propagateChange: any = () => { };

  constructor(private helperService: HelperService, private productService: ProductService) { this.getCategories(); }

  writeValue(value: any) {
    if (value) {
      this.value = value;
    }
  }

  registerOnChange(fn) {
    this.propagateChange = fn;
  }
  registerOnTouched(fn: () => void): void { }

  onChange(event) {
    this.propagateChange(event.target.value);
  }

  chipClick(value?) {
    const elementPos = this.pathMap.map(x => x.id).indexOf(value);
    if (this.pathMap) {
      this.pathMap.length = elementPos + 1;
    }
    this.propagateChange(value);
    this.getCategories(value);
  }

  getCategories(value?: any) {
    const obj = this.options.find(o => o.id === value);
    if (obj) {
      this.pathMap.push(obj);
    }
    const id = value || 0;
    this.propagateChange(value);
    this.productService.getProductCategories(id).subscribe(result => this.options = result
      , error => this.helperService.openSnackBar('There is an error! Please try again!', error)
    );
  }


}
