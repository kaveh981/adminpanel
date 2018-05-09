import { Component, OnInit, Input, ViewChild } from '@angular/core';
import {
  FormControl, ValidationErrors,
  FormGroupDirective, NgForm, Validators, ValidatorFn, FormBuilder, AbstractControl, FormGroup
} from '@angular/forms';
import { TreeComponent, ITreeOptions } from 'angular-tree-component';
import { EmployeeService } from '../shared/employee.service';
import { MainMenuTabService } from '../../shared-services/main-menu-tab.service';
import { MatTableDataSource, MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatPaginator, MatSort } from '@angular/material';
import { HelperService } from '../../shared-services/helper.service';
import { ConfirmationPopupComponent } from '../../shared-components/confirmation-popup/confirmation-popup.component';

@Component({
  selector: 'app-role-search',
  templateUrl: './role-search.component.html',
  styleUrls: ['./role-search.component.css']
})
export class RoleSearchComponent implements OnInit {
  @ViewChild(TreeComponent)
  private tree: TreeComponent;

  nodes = [];

  selectedNode;
  options: ITreeOptions = {
    getChildren: this.getCategories.bind(this)
  };

  constructor(private employeeService: EmployeeService,
    private helperService: HelperService,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<RoleSearchComponent>) {
  }

  ngOnInit() {
    this.getRoots();
  }

  onFocus(e) {
    this.dialogRef.close(e.node.data.id);
  }

  getRoots() {
    this.employeeService.getNodesByParentId(0)
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
    return this.employeeService.getNodesByParentId(node.data.id).toPromise();
  }
}

