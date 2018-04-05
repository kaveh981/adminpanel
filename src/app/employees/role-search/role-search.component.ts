import { Component, OnInit, OnChanges, Input, SimpleChanges, ViewChild } from '@angular/core';
import { EmployeeService } from '../shared/employee.service';
import { MatTableDataSource, MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatPaginator, MatSort } from '@angular/material';
import { ConfirmationPopupComponent } from '../../shared-components/confirmation-popup/confirmation-popup.component';
import 'rxjs/add/operator/retry';
import { MainMenuTabService } from '../../shared-services/main-menu-tab.service';

@Component({
  selector: 'app-role-search',
  templateUrl: './role-search.component.html',
  styleUrls: ['./role-search.component.css']
})
export class RoleSearchComponent implements OnInit {
  displayedColumns = ['roleId', 'role'];
  dataSource: MatTableDataSource<Role>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private employeeService: EmployeeService, public dialogRef: MatDialogRef<RoleSearchComponent>) { }
  ngOnInit() {
    this.subscribeMethod();
  }

  click(roleId) {
    this.dialogRef.close(roleId);
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  subscribeMethod() {
    this.employeeService.getRoles()
      .subscribe(data => {
        this.dataSource = new MatTableDataSource<Role>(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }
}

