import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-employee-menu',
  templateUrl: './employee-menu.component.html',
  styleUrls: ['./employee-menu.component.css']
})
export class EmployeeMenuComponent implements OnInit {

  @Input()
  employeeIdFromEmployeeMenu: number;

  constructor() { }

  ngOnInit() {
  }

}
