import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { EmployeeAccessEditComponent } from '../employee-access-edit/employee-access-edit.component';
import { EmployeeEditComponent } from '../employee-edit/employee-edit.component';
import { RoleAssignComponent } from '../role-assign/role-assign.component';
import { AuthService } from '../../shared-services/auth.service';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-employee-menu',
  templateUrl: './employee-menu.component.html',
  styleUrls: ['./employee-menu.component.css']
})
export class EmployeeMenuComponent implements OnInit {

  @Input()
  tabId: number;
  @ViewChild('subTab')
  matTabsModule: MatTabsModule;
  @ViewChild(EmployeeAccessEditComponent)
  employeeAccessEditComponent: EmployeeAccessEditComponent;
  @ViewChild(EmployeeEditComponent)
  employeeEditComponent: EmployeeEditComponent;

  @ViewChild(RoleAssignComponent)
  roleAssignComponent: RoleAssignComponent;

  tabIndex: number;
  tabLabel = '';

  constructor(private authService: AuthService) { }
  changeTabEvent(e) {
    this.tabIndex = e.index;
    this.tabLabel = e.tab.textLabel;
  }

  ngOnInit() {
    setTimeout(() => this.tabLabel = this.matTabsModule['_tabs'].first.textLabel);
  }

}
