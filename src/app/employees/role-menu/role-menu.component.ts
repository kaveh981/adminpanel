import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { AuthService } from '../../shared-services/auth.service';
import { MatTabsModule } from '@angular/material/tabs';
import { RoleEditComponent } from '../role-edit/role-edit.component';

@Component({
  selector: 'app-role-menu',
  templateUrl: './role-menu.component.html',
  styleUrls: ['./role-menu.component.css']
})
export class RoleMenuComponent implements OnInit {

  @Input()
  tabId: number;
  @ViewChild('subTab')
  matTabsModule: MatTabsModule;
  @ViewChild(RoleEditComponent)
  roleEditComponent: RoleEditComponent;

  tabLabel;

  changeTabEvent(e) {
    this.tabLabel = e.tab.textLabel;
  }

  constructor(private authService: AuthService) { }

  ngOnInit() {
    setTimeout(() => this.tabLabel = this.matTabsModule['_tabs'].first.textLabel);
  }

}
