import { Component, OnInit } from '@angular/core';
import { VisitedComponentsService } from '../../shared-services/visited-components.service';
@Component({
  selector: 'app-employees-menu',
  templateUrl: './employees-menu.component.html',
  styleUrls: ['./employees-menu.component.css']
})
export class EmployeesMenuComponent implements OnInit {

  tabIndex: number = null;
  isFirstTime?= null;
  changeTabEvent(e) {
    this.isFirstTime = false;
    this.tabIndex = e.index;
  }

  constructor(private visited: VisitedComponentsService) { }

  ngOnInit() {
    if (this.isFirstTime === null) {
      this.isFirstTime = true;
    }
  }

}
