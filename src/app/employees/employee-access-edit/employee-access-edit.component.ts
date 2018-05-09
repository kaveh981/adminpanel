import { Component, OnInit, Input } from '@angular/core';
import {
  FormControl, FormBuilder,
  FormGroupDirective, Validators, FormGroup
} from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { EmployeeService } from '../shared/employee.service';
import { passwordConfirmationMatcher } from '../shared/custom-validators';
import { HelperService } from '../../shared-services/helper.service';


@Component({
  selector: 'app-employee-access-edit',
  templateUrl: './employee-access-edit.component.html',
  styleUrls: ['./employee-access-edit.component.css']
})
export class EmployeeAccessEditComponent implements OnInit {

  @Input('tabId')
  tabId: number;

  employeeFormPassword: FormGroup;
  employeeFormEmail: FormGroup;

  employeeDetails: IEmployee;

  passwordDetails: UpdateEmployeePassword;

  constructor(fb: FormBuilder, private helperService: HelperService, private employeeService: EmployeeService) {
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
    if (this.tabId) {
      this.employeeService.getEmployeeById(this.tabId)
        .subscribe(data => {
          this.employeeDetails = data;
          this.employeeFormEmail.patchValue({
            email: data.email,
            id: data.employeeId
          });
        });
    }
  }

  editEmployeeEmail(value: UpdateEmployeeEmail) {
    this.employeeService.updateEmployeeEmail(value)
      .subscribe(
      (response) => {
        console.log(response);
        if (response.success) {
          this.helperService.openSnackBar('The employee has been updated');
        } else {
          this.helperService.openSnackBar(response.message);
        }
      }, (error) => {
        this.helperService.openSnackBar('There is an error! Please try again! ', error);
      }
      );
  }

  editEmployeePassword(value) {
    this.employeeService.updateEmployeePassword(
      { id: this.tabId, oldPassword: value.currentPassword, newPassword: value.passwords.password })
      .subscribe(
      (response) => {
        if (response.success) {
          this.helperService.openSnackBar('The password has been updated');
        } else {
          this.helperService.openSnackBar(response.message);
        }
      }, (error) => {
        this.helperService.openSnackBar('There is an error! Please try again!', error);
      }
      );
  }

}
