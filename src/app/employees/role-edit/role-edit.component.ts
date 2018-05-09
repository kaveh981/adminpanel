import { Component, OnInit, Input } from '@angular/core';
import {
  FormControl, FormBuilder,
  FormGroupDirective, Validators, FormGroup
} from '@angular/forms';
import { EmployeeService } from '../shared/employee.service';
import { HelperService } from '../../shared-services/helper.service';

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

  constructor(fb: FormBuilder, private employeeService: EmployeeService, private helperService: HelperService) {
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
        this.helperService.openSnackBar('The role has been updated');
      },
      (error) => {
        this.helperService.openSnackBar('There is an error! Please try again!', error);
      }
      );
  }

}
