import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeesMenuComponent } from './employees-menu/employees-menu.component';
import { ListEmployeeComponent } from './employees-list/list-employee.component';
import { NewEmployeeComponent } from './employee-new/new-employee.component';
import { MatTabsModule } from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule, MatSnackBarModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { EmployeeService } from '../employees/shared/employee.service';
import { EmployeeMenuComponent } from './employee-menu/employee-menu.component';
import { EmployeeEditComponent } from './employee-edit/employee-edit.component';
import { EmployeeAccessEditComponent } from './employee-access-edit/employee-access-edit.component';
import { MatGridListModule } from '@angular/material/grid-list';

@NgModule({
  imports: [
    CommonModule,
    MatTabsModule,
    ReactiveFormsModule,
    MatInputModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    HttpClientModule,
    MatSnackBarModule,
    MatGridListModule
  ],

  providers: [EmployeeService],

  declarations: [EmployeesMenuComponent, ListEmployeeComponent,
    NewEmployeeComponent, EmployeeMenuComponent, EmployeeEditComponent, EmployeeAccessEditComponent],

  exports: [EmployeesMenuComponent, EmployeeMenuComponent]

})
export class EmployeesModule { }
