import { Component, OnInit, Input } from '@angular/core';
import {
  FormControl, FormBuilder,
  FormGroupDirective, Validators, FormGroup
} from '@angular/forms';
import { IEmployee, UpdateEmployeeEmail } from '../shared/employee.infc';
import { MatSnackBar } from '@angular/material';
import { EmployeeService } from '../shared/employee.service';


@Component({
  selector: 'app-employee-access-edit',
  templateUrl: './employee-access-edit.component.html',
  styleUrls: ['./employee-access-edit.component.css']
})
export class EmployeeAccessEditComponent implements OnInit {

  @Input('employeeIdFromEmployeeMenu')
  employeeIdFromEmployeeMenu: number;

  employeeForm: FormGroup;
  employeeFormEmail: FormGroup;

  employeeDetails: IEmployee;

  constructor(fb: FormBuilder, public snackBar: MatSnackBar, private employeeService: EmployeeService) {
    this.employeeFormEmail = fb.group({
      'email': ['', Validators.compose([Validators.required, Validators.email])],
      'password': ['', Validators.required],
      'id': []
    });
    this.employeeForm = fb.group({
      'name': ['', Validators.required],
      'family': ['', Validators.required],
      'id': []
    });
  }

  ngOnInit() {
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

  openSnackBar(message: string) {
    this.snackBar.open(message, '', {
      duration: 2000,
    });
  }

}
