import { Component, OnInit } from '@angular/core';
import {
  FormControl, FormBuilder,
  FormGroupDirective, Validators, FormGroup
} from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  hide = true;

  userLogIn: FormGroup;

  constructor(fb: FormBuilder) {

    this.userLogIn = fb.group({
      'email': ['', Validators.compose([Validators.required, Validators.email])],
      'password': ['', Validators.required],
      'id': []
    });
  }

  ngOnInit() {
  }

  signInInput(value: any) {
    console.log(value)
  }

}
