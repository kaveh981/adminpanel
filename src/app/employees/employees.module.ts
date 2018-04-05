import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeesMenuComponent } from './employees-menu/employees-menu.component';
import { ListEmployeeComponent } from './employees-list/list-employee.component';
import { NewEmployeeComponent } from './employee-new/new-employee.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {
  MatTabsModule,
  MatButtonModule, MatCardModule, MatInputModule, MatTableModule,
  MatSnackBarModule, MatCheckboxModule, MatListModule, MatSelectModule, MatIconModule, MatPaginatorModule,
  MatSortModule
} from '@angular/material';
import { EmployeeService } from '../employees/shared/employee.service';
import { EmployeeMenuComponent } from './employee-menu/employee-menu.component';
import { EmployeeEditComponent } from './employee-edit/employee-edit.component';
import { EmployeeAccessEditComponent } from './employee-access-edit/employee-access-edit.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { EmployeesRolesNewComponent } from '../employees/employees-roles-new/employees-roles-new.component';
import { RoleMenuComponent } from './role-menu/role-menu.component';
import { RoleEditComponent } from './role-edit/role-edit.component';
import { RoleAssignComponent } from './role-assign/role-assign.component';
import { RouteNewComponent } from './route-new/route-new.component';
import { RoleSearchComponent } from './role-search/role-search.component';
import { RouteMenuComponent } from './route-menu/route-menu.component';
import { RouteEditComponent } from './route-edit/route-edit.component';

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
    MatSnackBarModule,
    MatCheckboxModule,
    MatGridListModule,
    MatListModule,
    MatSelectModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule
  ],
  entryComponents: [RoleSearchComponent],

  providers: [EmployeeService],

  declarations: [EmployeesMenuComponent, ListEmployeeComponent,
    NewEmployeeComponent, EmployeeMenuComponent, EmployeeEditComponent, EmployeeAccessEditComponent,
    EmployeesRolesNewComponent, RoleMenuComponent, RoleEditComponent, RoleAssignComponent, RouteNewComponent,
    RoleSearchComponent, RouteMenuComponent, RouteEditComponent],

  exports: [EmployeesMenuComponent, EmployeeMenuComponent, RoleMenuComponent, RouteMenuComponent]

})
export class EmployeesModule { }
