import { Component, OnInit } from '@angular/core';
import { IEmployee } from '../shared/employee.infc';
import { EmployeeService } from '../shared/employee.service';
import { MatTableDataSource } from '@angular/material'

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.css']
})
export class ListEmployeeComponent implements OnInit {


  dataSource: MatTableDataSource<IEmployee>;

  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
    this.employeeService.employeeList()
      .subscribe(data => this.dataSource = new MatTableDataSource<IEmployee>(data));

  }

  displayedColumns = ['employeeId', 'name', 'family', 'email'];

}
