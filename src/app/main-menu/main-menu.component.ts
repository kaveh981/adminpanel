import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { TabsetComponent, TabDirective } from 'ngx-bootstrap';
import { MainMenuTabService } from '../shared-services/main-menu-tab.service';
import { AuthService } from '../shared-services/auth.service';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {

  constructor(private mainMenuTab: MainMenuTabService, private authService: AuthService) { }

  removeTabHandler(tab: MainTab): void {
    this.mainMenuTab.removeTab(tab);
  }

  ngOnInit() {
  }

}
