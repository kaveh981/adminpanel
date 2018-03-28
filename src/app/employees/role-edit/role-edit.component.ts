import { Component, OnInit, Input } from '@angular/core';
import {
  FormControl, FormBuilder,
  FormGroupDirective, Validators, FormGroup
} from '@angular/forms';
import { EmployeeService } from '../shared/employee.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-role-edit',
  templateUrl: './role-edit.component.html',
  styleUrls: ['./role-edit.component.css']
})
export class RoleEditComponent implements OnInit {

  @Input('tabId')
  tabId: number;
  myForm: FormGroup;
  role: Role;

  constructor(fb: FormBuilder, private employeeService: EmployeeService, public snackBar: MatSnackBar) {
    this.myForm = fb.group({
      'role': ['', Validators.required],
      'roleId': []
    });
  }

  ngOnInit(): void {
    if (this.tabId) {
      this.getRecordById(this.tabId);
    }
  }

  getRecordById(tabId) {
    this.employeeService.getRoleById(tabId)
      .subscribe(data => {
        this.role = data;
        this.myForm.patchValue({
          role: data.role,
          roleId: data.roleId
        });
      });
  }

  submitForm(value: Role): void {
    console.log(value);
    this.employeeService.updateRole(value)
      .subscribe(
      () => {
        this.openSnackBar('The role has been updated');
      },
      () => {
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
