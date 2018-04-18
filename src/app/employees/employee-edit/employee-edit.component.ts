import { Component, OnInit, Input } from '@angular/core';
import {
  FormControl, FormBuilder,
  FormGroupDirective, Validators, FormGroup
} from '@angular/forms';
import { EmployeeService } from '../shared/employee.service';
import { MatSnackBar } from '@angular/material';
import { HelperService } from '../../shared-services/helper.service';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent implements OnInit {

  @Input('tabId')
  tabId: number;

  employeeForm: FormGroup;

  employeeDetails: IEmployee;

  constructor(fb: FormBuilder, private employeeService: EmployeeService, private helperService: HelperService) {
    this.employeeForm = fb.group({
      'name': ['', Validators.required],
      'family': ['', Validators.required],
      'id': []
    });
  }

  ngOnInit(): void {
    if (this.tabId) {
      this.employeeService.getEmployeeById(this.tabId)
        .subscribe(data => {
          this.employeeDetails = data;
          this.employeeForm.patchValue({
            name: data.name,
            family: data.family,
            id: data.employeeId
          });
        });
    }
  }

  editEmployee(value: UpdateEmployee): void {
    this.employeeService.updateEmployee(value)
      .subscribe(
      () => {
        this.helperService.openSnackBar('The employee has been updated');
      },
      (error) => {
        this.helperService.openSnackBar('There is an error! Please try again! ' + error.error);
      });
  }

}
