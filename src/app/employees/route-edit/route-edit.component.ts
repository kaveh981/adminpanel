import { Component, OnInit, Input } from '@angular/core';
import {
  FormControl, FormBuilder,
  FormGroupDirective, Validators, FormGroup
} from '@angular/forms';
import { EmployeeService } from '../shared/employee.service';
import { MatSnackBar } from '@angular/material';

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

  constructor(fb: FormBuilder, private employeeService: EmployeeService, public snackBar: MatSnackBar) {
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
          roleId: data.role['roleId'],
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
        this.openSnackBar('The route has been updated');
      },
      () => {
        this.openSnackBar('There is an error! Please try again!');
      }
      );
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, '', {
      duration: 2000,
    });
  }

}