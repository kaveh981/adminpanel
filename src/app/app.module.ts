import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { EmployeesModule } from './employees/employees.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatTab} from '@angular/material';
import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    EmployeesModule,
    BrowserAnimationsModule,
    MatTab
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
