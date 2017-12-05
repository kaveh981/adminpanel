import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-employee',
  templateUrl: './new-employee.component.html',
  styleUrls: ['./new-employee.component.css']
})
export class NewEmployeeComponent implements OnInit {

  firstNameFormControl = new FormControl('', [
    Validators.required,
  ]);

  lastNameFormControl = new FormControl('', [
    Validators.required,
  ]);

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  constructor() { }

  ngOnInit() {
  }

  onSubmit(){
    console.log('Name:' + this.firstNameFormControl.value, 'Last Name:' + this.lastNameFormControl.value, 'Email:' +this.emailFormControl.value);
  }

}
