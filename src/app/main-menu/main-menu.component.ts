import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { TabsetComponent, TabDirective } from 'ngx-bootstrap';
import { MainMenuTabService } from '../shared-services/main-menu-tab.service';

@Component({
  selector: 'app-main-menu',
 // changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {

  @ViewChild('staticTabs') staticTabs: TabsetComponent;


  // Addtab() {
  //   this.staticTabs.tabs.push({heading:'aa'})
  //   this.staticTabs.addTab({elementRef:'content',heading: 'NewTab',renderer:'rrr'})
  // }

  constructor(public mainMenuTab: MainMenuTabService) { }

  ngOnInit() {
  }

}
