import { Component, OnInit } from '@angular/core';
import { VisitedComponentsService } from '../../shared-services/visited-components.service';

@Component({
  selector: 'app-employees-menu',
  templateUrl: './employees-menu.component.html',
  styleUrls: ['./employees-menu.component.css']
})
export class EmployeesMenuComponent implements OnInit {

  tabIndex: number = null;

  changeTabEvent(e) {

    this.tabIndex = e.index;
  }

  constructor(private visited: VisitedComponentsService) { }

  ngOnInit() {

  }

}
