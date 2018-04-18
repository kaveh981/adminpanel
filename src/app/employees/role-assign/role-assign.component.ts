import { Component, OnInit, Input } from '@angular/core';
import { MatCheckboxModule, MatCheckboxChange } from '@angular/material';
import { EmployeeService } from '../shared/employee.service';
import { HelperService } from '../../shared-services/helper.service';

@Component({
  selector: 'app-role-assign',
  templateUrl: './role-assign.component.html',
  styleUrls: ['./role-assign.component.css']
})
export class RoleAssignComponent implements OnInit {
  @Input()
  tabId: string;
  roles: Role[] = [];
  constructor(private employeeService: EmployeeService, private helperService: HelperService) { }

  ngOnInit() {
    this.getRolesForUser();
  }

  checkChange(e: MatCheckboxChange, roleId) {
    this.employeeService.addOrRemoveUserRole({ employeeId: this.tabId, roleId: roleId, checked: e.checked }).subscribe(
      (result: ResponseDetails) => {
        if (result.success) {
          this.helperService.openSnackBar(result.message);
        }
      },
      () => {
        this.helperService.openSnackBar('There is an error! Please try again!');
      }
    );
  }

  getRolesForUser() {
    this.employeeService.getRolesForUser(this.tabId).subscribe(data => this.roles = data,
      error => this.helperService.openSnackBar('opse! something went wrong loading roles'));
  }

}
