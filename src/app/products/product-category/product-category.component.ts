import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TreeComponent, ITreeOptions } from 'angular-tree-component';
import { ProductService } from '../shared/product.service';
import { MatTableDataSource, MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { ConfirmationPopupComponent } from '../../shared-components/confirmation-popup/confirmation-popup.component';


@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.css']
})
export class ProductCategoryComponent implements OnInit {

  @ViewChild(TreeComponent)
  private tree: TreeComponent;

  myForm: FormGroup;
  statuses = [
    { key: 'active', value: 0 },
    { key: 'inactive', value: 1 },
    { key: 'deleted', value: 2 }
  ];
  nodes = [];

  selectedNode;
  //= [
  //   {
  //     id: 1,
  //     name: 'root1',
  //     children: [
  //       { id: 2, name: 'child1' },
  //       { id: 3, name: 'child2' }
  //     ]
  //   },
  //   {
  //     id: 4,
  //     name: 'root2',
  //     children: [
  //       { id: 5, name: 'child2.1' },
  //       {
  //         id: 6,
  //         name: 'child2.2',
  //         children: [
  //           { id: 7, name: 'subsub' }
  //         ]
  //       }
  //     ]
  //   }
  // ];
  options: ITreeOptions = {
    getChildren: this.getCategories.bind(this)
  };

  constructor(private productService: ProductService,
    public snackBar: MatSnackBar,
    private dialog: MatDialog,
    fb: FormBuilder) {
    this.myForm = fb.group({
      category: ['', Validators.required],
      status: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.getRoots();
  }

  submitForm(value: any): void {
    console.log(value);
    if (this.selectedNode) {
      value.parentId = this.selectedNode.id;
    }
    this.productService.postProductCategory(value)
      .subscribe(
      (node) => {
        console.log(node);
        if (this.selectedNode) {
          this.selectedNode['children'] = this.selectedNode['children'] || [];
          this.selectedNode['children'].push(node);
        } else {
          this.nodes.push(node);
        }
        this.tree.treeModel.update();
        console.log(this.selectedNode);
        //this.getRoots();
        this.openSnackBar('The route has been added!');
      },
      () => {
        this.openSnackBar('There is an error! Please try again!');
      });
  }

  onFocus(e) {
    this.selectedNode = e.node.data;
    console.log(e.node.data);
  }

  getRoots() {
    this.productService.getProductCategories(0)
      .subscribe(
      (result) => {
        this.nodes = [];
        result.forEach(element => {
          console.log(element);
          this.nodes.push(element);
        });
        this.tree.treeModel.update();
        this.openSnackBar('The route has been added!');
      },
      () => {
        this.openSnackBar('There is an error! Please try again!');
      });
  }

  getCategories(node: any) {
    return this.productService.getProductCategories(node.data.id).toPromise();
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, '', {
      duration: 2000,
    });
  }

}
