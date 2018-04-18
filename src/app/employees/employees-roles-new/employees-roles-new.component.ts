import { Component, OnInit, Input } from '@angular/core';
import {
  FormControl, ValidationErrors,
  FormGroupDirective, NgForm, Validators, ValidatorFn, FormBuilder, AbstractControl, FormGroup
} from '@angular/forms';
import { EmployeeService } from '../shared/employee.service';
import { MainMenuTabService } from '../../shared-services/main-menu-tab.service';
import { MatTableDataSource, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HelperService } from '../../shared-services/helper.service';
import { ConfirmationPopupComponent } from '../../shared-components/confirmation-popup/confirmation-popup.component';

@Component({
  selector: 'app-employees-roles-new',
  templateUrl: './employees-roles-new.component.html',
  styleUrls: ['./employees-roles-new.component.css']
})
export class EmployeesRolesNewComponent implements OnInit {

  myForm: FormGroup;
  dataSource: MatTableDataSource<Role>;
  displayedColumns = ['roleId', 'role', 'delete', 'edit'];

  constructor(fb: FormBuilder, private employeeService: EmployeeService,
    private helperService: HelperService,
    private dialog: MatDialog,
    public mainMenuTab: MainMenuTabService,
  ) {

    this.myForm = fb.group({
      'role': ['', Validators.required]
    });
  }

  ngOnInit() {
    this.getList();
  }

  getList() {
    this.employeeService.getRolesForUser(0)
      .subscribe(data => {
        this.dataSource = new MatTableDataSource<Role>(data);
        console.log(this.dataSource);
      },
      () => {
        this.helperService.openSnackBar('There is an error loading roles! Please try again!');
      }
      );
  }

  submitForm(value: any): void {
    this.employeeService.postNewRole(value)
      .subscribe(
      () => {
        this.helperService.openSnackBar('The role has been added!');
        this.getList();
      },
      () => {
        this.helperService.openSnackBar('There is an error! Please try again!');
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
          this.employeeService.deleteRole(id)
            .subscribe(() => {
              const newEmployeeArray = this.dataSource.data.filter(role => role.roleId !== id);
              this.dataSource.data = newEmployeeArray;
            }, () => {
              this.helperService.openSnackBar('There is an error! Please try again!');
            });
        }
      });
  }

  addNewTab(element): void {
    this.mainMenuTab.addNewTab({
      title: element.role,
      content: `role`,
      tabId: element.roleId,
      mainName: 'role',
      disabled: false,
      removable: true
    });
  }

}
