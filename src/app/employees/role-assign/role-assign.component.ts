import { Component, OnInit, Input } from '@angular/core';
import { MatCheckboxModule, MatSnackBar, MatCheckboxChange } from '@angular/material';
import { EmployeeService } from '../shared/employee.service';


@Component({
  selector: 'app-role-assign',
  templateUrl: './role-assign.component.html',
  styleUrls: ['./role-assign.component.css']
})
export class RoleAssignComponent implements OnInit {
  @Input()
  tabId: string;
  roles: Role[] = [];
  constructor(private employeeService: EmployeeService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getRolesForUser();
  }

  checkChange(e: MatCheckboxChange, roleId) {
    this.employeeService.addOrRemoveUserRole({ employeeId: this.tabId, roleId: roleId, checked: e.checked }).subscribe(
      (result: ResponseDetails) => {
        if (result.success) {
          this.openSnackBar(result.message);
        }
      },
      () => {
        this.openSnackBar('There is an error! Please try again!');
      }
    );
  }

  getRolesForUser() {
    this.employeeService.getRolesForUser(this.tabId).subscribe(data => this.roles = data,
      error => this.openSnackBar('opse! something went wrong loading roles'));
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, '', {
      duration: 2000,
    });
  }

}
