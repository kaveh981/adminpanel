import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';
import { IEmployee } from '../shared/employee.infc';
import { EmployeeService } from '../shared/employee.service';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.css']
})
export class ListEmployeeComponent implements OnInit, OnChanges {

  @Input()
  selectedTabIndex: number;

  dataSource: MatTableDataSource<IEmployee>;

  displayedColumns = ['employeeId', 'name', 'family', 'email', 'delete'];

  constructor(private employeeService: EmployeeService) { }

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      if (propName === 'selectedTabIndex') {
        if (changes[propName].currentValue === 1) {
          this.employeeService.employeeList()
            .subscribe(data => this.dataSource = new MatTableDataSource<IEmployee>(data));
        }
      }
    }
  }

  deleteColum(index) {
    this.employeeService.deleteEmployee(index)
      .subscribe(() => { }, () => {
        const newEmployeeArray = this.dataSource.data.filter(emp => emp.employeeId !== index.employeeId);
        // console.log(JSON.stringify(arr.filter(emp => { return emp.employeeId !== index.employeeId })));
        // console.log(JSON.stringify(myNewArr));
        this.dataSource.data = newEmployeeArray;
      }, () => { });
  }
}
