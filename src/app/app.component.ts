import { Component, OnInit } from '@angular/core';
import { AuthService } from './shared-services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  isAuthenticated: boolean;
  constructor(private authService: AuthService) { }

  onLogin(isAuthenticated) {
    console.log(isAuthenticated);
    this.isAuthenticated = isAuthenticated;
  }

  ngOnInit() {
    this.isAuthenticated = this.authService.isUserAuthenticated();
  }

  logout() {
    this.authService.logout();
    this.isAuthenticated = false;
  }
}
