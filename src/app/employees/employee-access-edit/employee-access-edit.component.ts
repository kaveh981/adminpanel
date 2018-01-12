import { Component, OnInit, Input } from '@angular/core';
import {
  FormControl, FormBuilder,
  FormGroupDirective, Validators, FormGroup
} from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { EmployeeService } from '../shared/employee.service';
import { VisitedComponentsService } from '../../shared-services/visited-components.service';
import { passwordConfirmationMatcher } from '../shared/custom-validators';


@Component({
  selector: 'app-employee-access-edit',
  templateUrl: './employee-access-edit.component.html',
  styleUrls: ['./employee-access-edit.component.css']
})
export class EmployeeAccessEditComponent implements OnInit {

  @Input('employeeIdFromEmployeeMenu')
  employeeIdFromEmployeeMenu: number;

  @Input()
  tabIndex: number;

  employeeFormPassword: FormGroup;
  employeeFormEmail: FormGroup;

  employeeDetails: IEmployee;

  passwordDetails: UpdateEmployeePassword;

  constructor(fb: FormBuilder, public snackBar: MatSnackBar, private employeeService: EmployeeService,
    private visited: VisitedComponentsService) {
    this.employeeFormEmail = fb.group({
      'email': ['', Validators.compose([Validators.required, Validators.email])],
      'password': ['', Validators.required],
      'id': []
    });
    this.employeeFormPassword = fb.group({
      'currentPassword': ['', Validators.required],
      'passwords': fb.group({
        'password': ['', Validators.required],
        'passwordConfirmation': ['', Validators.compose([Validators.required, passwordConfirmationMatcher])],
      }),
      'id': []
    });
  }

  ngOnInit() {
    const isVisited = this.visited.checkIn(`${this.employeeIdFromEmployeeMenu}-app-employee-access-edit`);
    if (!isVisited) {
      if (this.employeeIdFromEmployeeMenu) {
        this.employeeService.getEmployeeById(this.employeeIdFromEmployeeMenu)
          .subscribe(data => {
            this.employeeDetails = data;
            this.employeeFormEmail.patchValue({
              email: data.email,
              id: data.employeeId
            });
          });
      }
    }
  }

  editEmployeeEmail(value: UpdateEmployeeEmail) {
    this.employeeService.updateEmployeeEmail(value)
      .subscribe(
      (response) => {
        if (response.success) {
          this.openSnackBar('The employee has been updated');
        } else {
          this.openSnackBar(response.message);
        }
      }, () => {
        this.openSnackBar('There is an error! Please try again!');
      }
      );
  }

  editEmployeePassword(value) {
    this.employeeService.updateEmployeePassword(
      { id: this.employeeIdFromEmployeeMenu, oldPassword: value.currentPassword, newPassword: value.passwords.password })
      .subscribe(
      (response) => {
        if (response.success) {
          this.openSnackBar('The password has been updated');
        } else {
          this.openSnackBar(response.message);
        }
      }, () => {
        this.openSnackBar('There is an error! Please try again!');
      }
      );
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, '', {
      duration: 2000,
    });
  }

}
