import { NgModule } from '@angular/core';
import { ModuleSharedModule } from '../module-shared/module-shared.module';
import { EmployeesMenuComponent } from './employees-menu/employees-menu.component';
import { ListEmployeeComponent } from './employees-list/list-employee.component';
import { EmployeeNewComponent } from './employee-new/employee-new.component';
import { EmployeeService } from '../employees/shared/employee.service';
import { EmployeeMenuComponent } from './employee-menu/employee-menu.component';
import { EmployeeEditComponent } from './employee-edit/employee-edit.component';
import { EmployeeAccessEditComponent } from './employee-access-edit/employee-access-edit.component';
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
    ModuleSharedModule
  ],
  entryComponents: [RoleSearchComponent],

  providers: [EmployeeService],

  declarations: [EmployeesMenuComponent, ListEmployeeComponent,
    EmployeeNewComponent, EmployeeMenuComponent, EmployeeEditComponent, EmployeeAccessEditComponent,
    EmployeesRolesNewComponent, RoleMenuComponent, RoleEditComponent, RoleAssignComponent, RouteNewComponent,
    RoleSearchComponent, RouteMenuComponent, RouteEditComponent],

  exports: [EmployeesMenuComponent, EmployeeMenuComponent, RoleMenuComponent, RouteMenuComponent]

})
export class EmployeesModule { }
