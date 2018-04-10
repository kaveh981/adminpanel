import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ModuleSharedModule } from './module-shared/module-shared.module';
import { EmployeesModule } from './employees/employees.module';
import { ProductsModule } from './products/products.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatDialogModule, MatIconModule, MatToolbarModule,
  MatMenuModule, MatDatepickerModule, MatNativeDateModule
} from '@angular/material';
import { TabsModule } from 'ngx-bootstrap';
import { AppComponent } from './app.component';
import { ConfirmationPopupComponent } from './shared-components/confirmation-popup/confirmation-popup.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MainMenuTabService } from './shared-services/main-menu-tab.service';
import { TokenInterceptor } from './interceptors/token-interceptor';
import { JwtInterceptor } from './interceptors/jwt-interceptor';
import { ApiService } from './shared-services/api.service';
import { AuthService } from './shared-services/auth.service';

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
    ModuleSharedModule,
    HttpClientModule,
    EmployeesModule,
    ProductsModule,
    BrowserAnimationsModule,
    TabsModule.forRoot(),
    FlexLayoutModule,
    MatToolbarModule,
    MatMenuModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatIconModule
  ],
  providers: [
    MainMenuTabService, AuthService, ApiService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
