import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';
import { EmployeeService } from '../shared/employee.service';
import { MatTableDataSource, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ConfirmationPopupComponent } from '../../shared-components/confirmation-popup/confirmation-popup.component';
import 'rxjs/add/operator/retry';
import { MainMenuTabService } from '../../shared-services/main-menu-tab.service';

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.css']
})
export class ListEmployeeComponent implements OnInit {

  dataSource: MatTableDataSource<IEmployee>;

  displayedColumns = ['employeeId', 'name', 'family', 'email', 'delete', 'edit'];

  constructor(private employeeService: EmployeeService,
    public dialog: MatDialog,
    public mainMenuTab: MainMenuTabService) {
  }

  ngOnInit() {
      this.subscribeMethod();
  }

  addNewTab(element): void {
    this.mainMenuTab.addNewTab({
      title: element.name + ' ' + element.family,
      content: `employee`,
      tabId: element.employeeId,
      mainName: 'employee',
      disabled: false,
      removable: true
    });
  }

  // ngOnChanges(changes: SimpleChanges) {
  //   for (const propName in changes) {
  //     if (propName === 'selectedTabIndex') {
  //       if (changes[propName].currentValue === 1) {
  //         this.subscribeMethod();
  //       }
  //     }
  //   }
  // }

  subscribeMethod() {
    this.employeeService.employeeList()
      .subscribe(data => this.dataSource = new MatTableDataSource<IEmployee>(data));
  }

  deleteColum(employeeId) {
    const dialogRef = this.dialog.open(ConfirmationPopupComponent, {
      width: '250px',
      data: { message: 'Are you sure you want to delete this employee?' }
    });

    dialogRef.afterClosed()
      .subscribe(result => {
        if (result) {
          this.employeeService.deleteEmployee(employeeId)
            .subscribe(() => {
              const newEmployeeArray = this.dataSource.data.filter(emp => emp.employeeId !== employeeId);
              this.dataSource.data = newEmployeeArray;
            }, () => { }, () => { }
            );
        }
      });
  }
}
