import { Component, OnInit } from '@angular/core';
import {
  FormControl, ValidationErrors,
  FormGroupDirective, NgForm, Validators, ValidatorFn, FormBuilder, AbstractControl, FormGroup
} from '@angular/forms';
import { EmployeeService } from '../shared/employee.service';
import { passwordConfirmationMatcher } from '../shared/custom-validators';
import { HelperService } from '../../shared-services/helper.service';


@Component({
  selector: 'app-employee-new',
  templateUrl: './employee-new.component.html',
  styleUrls: ['./employee-new.component.css']
})

export class EmployeeNewComponent implements OnInit {

  employeeForm: FormGroup;

  constructor(fb: FormBuilder, private employeeService: EmployeeService, private helperService: HelperService) {

    this.employeeForm = fb.group({
      'name': ['', Validators.required],
      'family': ['', Validators.required],
      'email': ['', Validators.compose([Validators.required, Validators.email])],
      'passwords': fb.group({
        'password': ['', Validators.required],
        'passwordConfirmation': ['', Validators.compose([Validators.required, passwordConfirmationMatcher])],
      })
    });
  }

  ngOnInit(): void {
  }


  submitForm(value: any): void {
    this.employeeService.postEmployee({ name: value.name, family: value.family, email: value.email, password: value.passwords.password })
      .subscribe(
      () => {
        this.helperService.openSnackBar('The employee has been updated');
      },
      (error) => {
        this.helperService.openSnackBar('There is an error! Please try again! ' , error);
      });
  }

}
