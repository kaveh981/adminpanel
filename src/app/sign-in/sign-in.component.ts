import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {
  FormControl, FormBuilder,
  FormGroupDirective, Validators, FormGroup
} from '@angular/forms';
import { AuthService } from '../shared-services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  hide = true;
  @Output() onLogin = new EventEmitter<boolean>();

  userLogIn: FormGroup;

  constructor(fb: FormBuilder, private authService: AuthService) {

    this.userLogIn = fb.group({
      'email': ['', Validators.compose([Validators.required, Validators.email])],
      'password': ['', Validators.required],
      'id': []
    });
  }

  ngOnInit() {
  }

  signInInput(value: any) {
    console.log(value);
    this.authService.login({ username: value.email, password: value.password })
      .subscribe(authReturn => {
        console.log('reached hereeee');
        console.log(authReturn.token);
        this.authService.addTokens(authReturn.token.accessToken, authReturn.token.refreshToken);
        this.onLogin.emit(true);
      }, error => { console.log(error); this.onLogin.emit(false); });
  }

}
