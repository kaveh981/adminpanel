import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-employee-menu',
  templateUrl: './employee-menu.component.html',
  styleUrls: ['./employee-menu.component.css']
})
export class EmployeeMenuComponent implements OnInit {

  @Input()
  employeeIdFromEmployeeMenu: number;

  @Input()
  activeTab: boolean;

  tabIndex: number;

  changeTabEvent(e) {
    this.tabIndex = e.index;
  }

  constructor() { }

  ngOnInit() {
  }

}
