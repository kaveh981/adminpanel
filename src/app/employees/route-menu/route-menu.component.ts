import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { AuthService } from '../../shared-services/auth.service';
import { MatTabsModule } from '@angular/material/tabs';
import { RouteEditComponent } from '../route-edit/route-edit.component';

@Component({
  selector: 'app-route-menu',
  templateUrl: './route-menu.component.html',
  styleUrls: ['./route-menu.component.css']
})
export class RouteMenuComponent implements OnInit {

  @Input()
  tabId: number;
  @ViewChild('subTab')
  matTabsModule: MatTabsModule;
  @ViewChild(RouteEditComponent)
  routeEditComponent: RouteEditComponent;
  tabLabel;

  changeTabEvent(e) {
    this.tabLabel = e.tab.textLabel;
  }

  constructor(private authService: AuthService) { }

  ngOnInit() {
    setTimeout(() => this.tabLabel = this.matTabsModule['_tabs'].first.textLabel);
  }

}
