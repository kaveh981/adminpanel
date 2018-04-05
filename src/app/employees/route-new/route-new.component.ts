import { Component, OnInit, Input } from '@angular/core';
import {
  FormControl, ValidationErrors,
  FormGroupDirective, NgForm, Validators, ValidatorFn, FormBuilder, AbstractControl, FormGroup
} from '@angular/forms';
import { EmployeeService } from '../shared/employee.service';
import { MainMenuTabService } from '../../shared-services/main-menu-tab.service';
import { MatTableDataSource, MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { ConfirmationPopupComponent } from '../../shared-components/confirmation-popup/confirmation-popup.component';
import { RoleSearchComponent } from '../role-search/role-search.component';

@Component({
  selector: 'app-route-new',
  templateUrl: './route-new.component.html',
  styleUrls: ['./route-new.component.css']
})
export class RouteNewComponent implements OnInit {

  myForm: FormGroup;
  dataSource: MatTableDataSource<Route>;
  displayedColumns = ['routeId', 'route', 'role', 'method', 'delete', 'edit'];

  methods = [
    { key: 'post', value: 0 },
    { key: 'get', value: 1 },
    { key: 'put', value: 2 },
    { key: 'delete', value: 3 }
  ];

  roleId;
  constructor(fb: FormBuilder, private employeeService: EmployeeService,
    public snackBar: MatSnackBar,
    private dialog: MatDialog,
    public mainMenuTab: MainMenuTabService,
  ) {
    this.myForm = fb.group({
      route: ['', Validators.required],
      method: ['', Validators.required],
      roleId: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.getList();
  }

  getList() {
    this.employeeService.getRoutes()
      .subscribe(data => {
        this.dataSource = new MatTableDataSource<Route>(data);
      },
      () => {
        this.openSnackBar('There is an error loading routes! Please try again!');
      });
  }

  submitForm(value: any): void {
    this.employeeService.postNewRoute(value)
      .subscribe(
      () => {
        this.openSnackBar('The route has been added!');
        this.getList();
      },
      () => {
        this.openSnackBar('There is an error! Please try again!');
      }
      );
  }

  deleteRow(id) {
    const dialogRef = this.dialog.open(ConfirmationPopupComponent, {
      width: '250px',
      data: { message: 'Are you sure you want to delete this employee?' }
    });

    dialogRef.afterClosed()
      .subscribe(result => {
        if (result) {
          this.employeeService.deleteRoute(id)
            .subscribe(() => {
              const newRoutesArray = this.dataSource.data.filter(route => route.routeId !== id);
              this.dataSource.data = newRoutesArray;
            }, () => {
              this.openSnackBar('There is an error! Please try again!');
            });
        }
      });
  }

  addNewTab(element): void {
    this.mainMenuTab.addNewTab({
      title: element.route,
      content: `route`,
      tabId: element.routeId,
      mainName: 'route',
      disabled: false,
      removable: true
    });
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, '', {
      duration: 2000,
    });
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
