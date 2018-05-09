import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TreeComponent, ITreeOptions } from 'angular-tree-component';
import { ProductService } from '../shared/product.service';
import { HelperService } from '../../shared-services/helper.service';
import { MatTableDataSource, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
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
  action = 'Add';
  statuses = [
    { key: 'active', value: 0 },
    { key: 'inactive', value: 1 },
    { key: 'deleted', value: 2 }
  ];
  nodes = [];

  selectedNode;
  options: ITreeOptions = {
    getChildren: this.getCategories.bind(this)
  };

  constructor(private productService: ProductService,
    private helperService: HelperService,
    private dialog: MatDialog,
    fb: FormBuilder) {
    this.myForm = fb.group({
      name: ['', Validators.required],
      status: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.getRoots();
  }

  submitForm(value: any): void {
    if (this.action === 'Add') {
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
          this.helperService.openSnackBar('The route has been added!');
        },
        (error) => {
          this.helperService.openSnackBar('There is an error! Please try again!', error);
        });
    } else if (this.action === 'Update') {
      value.id = this.selectedNode.id;
      this.productService.updateProductCategory(value)
        .subscribe(
        (node) => {
          this.selectedNode.name = value.name;
          this.selectedNode.status = value.status;
          this.tree.treeModel.update();
          this.helperService.openSnackBar('The route has been added!');
        },
        (error) => {
          console.log(error);
          this.helperService.openSnackBar('', error);
        });
    }
  }

  onFocus(e) {
    this.selectedNode = e.node.data;
    console.log(e.node.data);
  }

  delete(node) {
    console.log(node);
    const dialogRef = this.dialog.open(ConfirmationPopupComponent, {
      width: '250px',
      data: { message: 'Are you sure you want to delete this employee?' }
    });

    dialogRef.afterClosed()
      .subscribe(result => {
        if (result) {
          this.productService.deleteProductCategory(node.data.id)
            .subscribe(() => {
              if (node.parent != null) {
                node.parent.data.children.splice(node.parent.data.children.indexOf(node.data), 1);
                this.tree.treeModel.update();
                if (node.parent.data.children.length === 0) {
                  node.parent.data.hasChildren = false;
                }
              }
              this.helperService.openSnackBar('The route has been deleted!');
            }, (error) => { console.log(error); this.helperService.openSnackBar('', error); }, () => { }
            );
        }
      });
  }


  edit(node) {

    this.productService.getProductCategoryById(node.data.id)
      .subscribe((data) => {
        this.myForm.patchValue({
          name: data.name,
          status: data.status
        });
        this.action = 'Update';
        this.selectedNode = node.data;
      }, (error) => { this.helperService.openSnackBar('', error); }, () => { }
      );
  }

  add(node) {
    this.selectedNode = node.data;
    this.myForm.patchValue({
      name: '',
      status: null
    });
    this.action = 'Add';
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
      },
      (error) => {
        this.helperService.openSnackBar('There is an error! Please try again!', error);
      });
  }

  getCategories(node: any) {
    return this.productService.getProductCategories(node.data.id).toPromise();
  }

}
