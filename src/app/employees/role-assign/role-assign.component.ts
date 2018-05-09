import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatCheckboxModule, MatCheckboxChange } from '@angular/material';
import { EmployeeService } from '../shared/employee.service';
import { HelperService } from '../../shared-services/helper.service';
import { TreeComponent, ITreeOptions } from 'angular-tree-component';

@Component({
  selector: 'app-role-assign',
  templateUrl: './role-assign.component.html',
  styleUrls: ['./role-assign.component.css']
})
export class RoleAssignComponent implements OnInit {
  @Input()
  tabId: string;
  roles: Role[] = [];

  @ViewChild(TreeComponent)
  private tree: TreeComponent;
  nodes = [];
  selectedNode;
  options: ITreeOptions = {
    getChildren: this.getCategories.bind(this)
  };


  constructor(private employeeService: EmployeeService, private helperService: HelperService) { }

  ngOnInit() {
    this.getRoots();
  }

  checkChange(e: MatCheckboxChange, roleId) {
    console.log('roleId');
    console.log(roleId);
    this.employeeService.addOrRemoveUserRole({ employeeId: this.tabId, roleId: roleId, checked: e.checked }).subscribe(
      (result: ResponseDetails) => {
        if (result.success) {
          this.helperService.openSnackBar(result.message);
        }
      },
      (error) => {
        this.helperService.openSnackBar('There is an error! Please try again!', error);
      }
    );
  }

  getRoots() {
    this.employeeService.getNodesByParentIdForEmployee({ parentId: 0, employeeId: this.tabId })
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
    return this.employeeService.getNodesByParentIdForEmployee({ parentId: node.data.id, employeeId: this.tabId }).toPromise();
  }

}
