import { Component, OnInit } from '@angular/core';
import {
  FormControl, ValidationErrors,
  FormGroupDirective, NgForm, Validators, ValidatorFn, FormBuilder, AbstractControl, FormGroup
} from '@angular/forms';
import { EmployeeService } from '../shared/employee.service';
import { passwordConfirmationMatcher } from '../shared/custom-validators';


@Component({
  selector: 'app-new-employee',
  templateUrl: './new-employee.component.html',
  styleUrls: ['./new-employee.component.css']
})

export class NewEmployeeComponent implements OnInit {

  employeeForm: FormGroup;

  constructor(fb: FormBuilder, private employeeService: EmployeeService) {

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


  submitForm(value: IEmployee): void {
    this.employeeService.postEmployee(value)
      .subscribe();
  }

}
