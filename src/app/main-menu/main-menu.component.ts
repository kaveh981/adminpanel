import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { TabsetComponent, TabDirective } from 'ngx-bootstrap';
import { MainMenuTabService } from '../shared-services/main-menu-tab.service';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {

  @ViewChild('staticTabs') staticTabs: TabsetComponent;

  removeTabHandler(tab: any): void {
    this.mainMenuTab.tabs.splice(this.mainMenuTab.tabs.indexOf(tab), 1);
  }

  constructor(public mainMenuTab: MainMenuTabService) { }

  ngOnInit() {
  }

}
