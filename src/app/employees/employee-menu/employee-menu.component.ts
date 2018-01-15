import { Component, OnInit, Input} from '@angular/core';
import { VisitedComponentsService } from '../../shared-services/visited-components.service';

@Component({
  selector: 'app-employee-menu',
  templateUrl: './employee-menu.component.html',
  styleUrls: ['./employee-menu.component.css']
})
export class EmployeeMenuComponent implements OnInit {

  @Input()
  employeeIdFromEmployeeMenu: number;

  tabIndex: number;

  changeTabEvent(e) {
    this.tabIndex = e.index;
  }

  constructor(private visited: VisitedComponentsService) { }

  ngOnInit() {
  }

}
