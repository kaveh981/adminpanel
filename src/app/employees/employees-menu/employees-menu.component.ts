import { Component, OnInit, ViewChild } from '@angular/core';
import { ListEmployeeComponent } from '../employees-list/list-employee.component';
import { EmployeesRolesNewComponent } from '../employees-roles-new/employees-roles-new.component';
import { EmployeeNewComponent } from '../employee-new/employee-new.component';
import { RouteNewComponent } from '../route-new/route-new.component';
import { AuthService } from '../../shared-services/auth.service';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-employees-menu',
  templateUrl: './employees-menu.component.html',
  styleUrls: ['./employees-menu.component.css']
})
export class EmployeesMenuComponent implements OnInit {
  @ViewChild('subTab')
  matTabsModule: MatTabsModule;
  @ViewChild(EmployeeNewComponent)
  employeeNewComponent: EmployeeNewComponent;
  @ViewChild(ListEmployeeComponent)
  listEmployeeComponent: ListEmployeeComponent;
  @ViewChild(EmployeesRolesNewComponent)
  employeesRolesNewComponent: EmployeesMenuComponent;
  @ViewChild(RouteNewComponent)
  routeNewComponent: RouteNewComponent;

  tabIndex: number = null;
  tabLabel = '';

  changeTabEvent(e) {
    console.log(e.tab);
    this.tabIndex = e.index;
    this.tabLabel = e.tab.textLabel;
    if (e.tab.textLabel === 'Employees List' && this.listEmployeeComponent) {
      this.listEmployeeComponent.subscribeMethod();
    }
  }

  constructor(private authService: AuthService) { }

  ngOnInit() {
    setTimeout(() => this.tabLabel = this.matTabsModule['_tabs'].first.textLabel);
  }

}
