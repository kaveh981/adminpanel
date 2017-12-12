import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { IEmployee } from '../shared/employee.infc';
import { EmployeeService } from '../shared/employee.service';
import { MatTableDataSource } from '@angular/material'
import { OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.css']
})
export class ListEmployeeComponent implements OnInit, OnChanges {

  @Input()
  selectedTabIndex: number;

  ngOnChanges(changes: SimpleChanges) {
    for (let propName in changes) {
      if (propName == "selectedTabIndex") {
        if (changes[propName].currentValue == 1){
          this.employeeService.employeeList()
          .subscribe(data => this.dataSource = new MatTableDataSource<IEmployee>(data));
        }
      }
    }
  }

  dataSource: MatTableDataSource<IEmployee>;

  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {}

  displayedColumns = ['employeeId', 'name', 'family', 'email'];

}
