import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { HelperService } from '../../shared-services/helper.service';
import { ProductService } from '../../products/shared/product.service';
import { TreeComponent as AngularTreeComponent, ITreeOptions } from 'angular-tree-component';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css']
})
export class TreeComponent implements OnInit {

  @Input() treeName: string;
  @Output() onFocus = new EventEmitter<any>();

  @ViewChild(AngularTreeComponent)
  private tree: AngularTreeComponent;
  nodes = [];
  value = '';
  options: ITreeOptions = {
    getChildren: this.getCategories.bind(this)
  };
  constructor(private helperService: HelperService, private productService: ProductService) { }


  onNodeFocus(e) {
    this.onFocus.emit(e);
  }

  ngOnInit() {
    this.getRoots();
  }

  getRoots() {
    this.productService.getProductCategories(0)
      .subscribe(
      (result) => {
        this.nodes = [];
        result.forEach(element => {
          this.nodes.push(element);
        });
        this.tree.treeModel.update();
      },
      (error) => {
        this.helperService.openSnackBar('There is an error! Please try again!', error);
      });
  }

  getCategories(node: any) {
    return this.productService.getProductCategories(node.data.id).toPromise();
  }


}
