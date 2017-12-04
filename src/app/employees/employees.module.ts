import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeesMenuComponent } from './employees-menu/employees-menu.component';
import { ListEmployeeComponent } from './employees-list/list-employee.component';
import { NewEmployeeComponent } from './employee-new/new-employee.component';
import { MatTabsModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatTabsModule
  ],
  declarations: [EmployeesMenuComponent, ListEmployeeComponent, NewEmployeeComponent],
  
  exports: [EmployeesMenuComponent]
})
export class EmployeesModule { }
