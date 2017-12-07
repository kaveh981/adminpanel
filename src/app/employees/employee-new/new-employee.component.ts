






import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms/src/model';
import { EmployeeService } from '../shared/employee.service';
import { IEmployee } from '../shared/employee.infc';


@Component({
  selector: 'app-new-employee',
  templateUrl: './new-employee.component.html',
  styleUrls: ['./new-employee.component.css']
})

export class NewEmployeeComponent implements OnInit {

  employeeForm: FormGroup;

  constructor(fb: FormBuilder, private employeeService: EmployeeService) {

    this.employeeForm = fb.group({
      'name': [null, Validators.required],
      'family': [null, Validators.required],
      'email': [null, Validators.compose([Validators.required, Validators.email])]
    })
  }

  ngOnInit(): void {
  }


  submitForm(value: IEmployee): void {
    console.log('Reactive Form Data: ')
    console.log(value);
    this.employeeService.postEmployee(value)
      .subscribe();
  }

}





