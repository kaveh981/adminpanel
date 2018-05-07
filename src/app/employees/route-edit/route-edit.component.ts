import { Component, OnInit, Input } from '@angular/core';
import {
  FormControl, FormBuilder,
  FormGroupDirective, Validators, FormGroup
} from '@angular/forms';
import { EmployeeService } from '../shared/employee.service';
import { MatDialog } from '@angular/material';
import { HelperService } from '../../shared-services/helper.service';
import { RoleSearchComponent } from '../role-search/role-search.component';

@Component({
  selector: 'app-route-edit',
  templateUrl: './route-edit.component.html',
  styleUrls: ['./route-edit.component.css']
})
export class RouteEditComponent implements OnInit {
  @Input('tabId')
  tabId: number;
  myForm: FormGroup;
  route: Route;
  methods = [
    { key: 'post', value: 0 },
    { key: 'get', value: 1 },
    { key: 'put', value: 2 },
    { key: 'delete', value: 3 }
  ];
  roleId;
  constructor(fb: FormBuilder,
    private employeeService: EmployeeService,
    private helperService: HelperService,
    private dialog: MatDialog) {
    this.myForm = fb.group({
      route: ['', Validators.required],
      method: ['', Validators.required],
      roleId: ['', Validators.required],
      routeId: null
    });
  }

  ngOnInit(): void {
    if (this.tabId) {
      this.getRecordById(this.tabId);
    }
  }

  getRecordById(tabId) {
    this.employeeService.getRouteById(tabId)
      .subscribe(data => {
        console.log(data);
        this.route = data;
        this.myForm.patchValue({
          roleId: data.role['id'],
          route: data.route,
          method: data.method,
          routeId: data.routeId
        });
      });
  }

  submitForm(value: Route): void {
    console.log(value);
    this.employeeService.updateRoute(value)
      .subscribe(
      () => {
        this.helperService.openSnackBar('The route has been updated');
      },
      () => {
        this.helperService.openSnackBar('There is an error! Please try again!');
      }
      );
  }

  searchRoles() {
    this.dialog.open(RoleSearchComponent).afterClosed()
      .subscribe(result => {
        if (result) {
          this.roleId = result;
        }
      });
  }

}
