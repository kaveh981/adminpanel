import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { EmployeesModule } from './employees/employees.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material';
import { AppComponent } from './app.component';
import { ConfirmationPopupComponent } from './shared-components/confirmation-popup/confirmation-popup.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { TabsModule } from 'ngx-bootstrap';
import { MainMenuTabService } from './shared-services/main-menu-tab.service';
import { TokenInterceptor } from './interceptors/token-interceptor';
import { JwtInterceptor } from './interceptors/jwt-interceptor';
import { ApiService } from './shared-services/api.service';
import { AuthService } from './shared-services/auth.service';
import { SignInComponent } from './sign-in/sign-in.component';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    ConfirmationPopupComponent,
    MainMenuComponent,
    SignInComponent
  ],
  entryComponents: [ConfirmationPopupComponent],

  imports: [
    BrowserModule,
    HttpClientModule,
    EmployeesModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatDialogModule,
    MatButtonModule,
    TabsModule.forRoot(),
    MatIconModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule
  ],
  providers: [
    MainMenuTabService, AuthService, ApiService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
