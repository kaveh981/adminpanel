import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms/src/model';

@Component({
  selector: 'app-new-employee',
  templateUrl: './new-employee.component.html',
  styleUrls: ['./new-employee.component.css']
})
export class NewEmployeeComponent implements OnInit {

  employeeForm : FormGroup;

  constructor(fb: FormBuilder) {
   
    this.employeeForm = fb.group({
      'firstName' : [null, Validators.required],
      'lastName': [null, Validators.required],
      'email' : [null, Validators.compose([Validators.required, Validators.email])]
    })   
   }

  ngOnInit() {
  }

  submitForm(value: any):void{
    console.log('Reactive Form Data: ')
    console.log(value);
  }

}
