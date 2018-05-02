import { Component, OnInit, ViewChild, Input, Output, EventEmitter, forwardRef, OnChanges, SimpleChanges } from '@angular/core';
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
export class TreeComponent implements ControlValueAccessor, OnInit, OnChanges {

  @Input() label: string;
  @Input() treeName: string;
  @Input() id: number;

  @ViewChild(AngularTreeComponent)
  private tree: AngularTreeComponent;
  options = [];
  pathMap = [];
  value = '';
  name = '';

  propagateChange: any = () => { };

  constructor(private helperService: HelperService, private productService: ProductService) {
  }

  writeValue(value: any) {
    if (value) {
      this.value = value;
    }
  }

  bindTreeData() {
    if (!this.id) {
      console.log('id need to be binded');
      return null;
    } else if (this.id !== 0) {
      this.setPath();
      this.getCategories(this.id);
    } else if (this.id === 0) {
      this.getCategories();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      if (propName === 'id') {
        this.bindTreeData();
      }
    }
  }

  registerOnChange(fn) {
    this.propagateChange = fn;
  }
  registerOnTouched(fn: () => void): void { }

  onChange(event) {
    this.propagateChange(event.target.value);
  }

  setPath() {
    this.productService.getParentCategoriesById(this.id).subscribe(result => {
      console.log(result);
      this.pathMap = result;
    }
      , error => this.helperService.openSnackBar('There is an error! Please try again!', error)
    );
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
