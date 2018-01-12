import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import {
  FormControl, FormBuilder,
  FormGroupDirective, Validators, FormGroup
} from '@angular/forms';
import { EmployeeService } from '../shared/employee.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent implements OnInit, OnChanges {

  @Input('employeeIdFromEmployeeMenu')
  employeeIdFromEmployeeMenu: number;

  @Input('activeTab')
  activeTab: boolean;

  employeeForm: FormGroup;

  employeeDetails: IEmployee;

  constructor(fb: FormBuilder, private employeeService: EmployeeService, public snackBar: MatSnackBar) {
    this.employeeForm = fb.group({
      'name': ['', Validators.required],
      'family': ['', Validators.required],
      'id': []
    });
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      if (this.activeTab) {
        if (changes[propName].currentValue === true) {
          if (this.employeeIdFromEmployeeMenu) {
            this.employeeService.getEmployeeById(this.employeeIdFromEmployeeMenu)
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
      }
    }
  }

  editEmployee(value: UpdateEmployee): void {
    this.employeeService.updateEmployee(value)
      .subscribe(
      () => {
        this.openSnackBar('The employee has been updated');
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
