import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ChangeDetectorRef } from '@angular/core';
import { TabsetComponent, TabDirective } from 'ngx-bootstrap';
import { MainMenuTabService } from '../shared-services/main-menu-tab.service';
import { AuthService } from '../shared-services/auth.service';
import { EmployeesMenuComponent } from '../employees/employees-menu/employees-menu.component';
import { ProductsMenuComponent } from '../products/products-menu/products-menu.component';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {

  @ViewChild('mainTabs') mainTabs: TabsetComponent;
  @ViewChild(EmployeesMenuComponent)
  employeesMenuComponent: EmployeesMenuComponent;
  @ViewChild(ProductsMenuComponent)
  productsMenuComponent: ProductsMenuComponent;

  tabIndex: number = null;
  tabLabel;

  constructor(private mainMenuTab: MainMenuTabService, private authService: AuthService,
    private cdRef: ChangeDetectorRef) { }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }


  changeTabEvent(e) {
    this.tabLabel = e.heading;
  }

  removeTabHandler(tab: MainTab): void {
    this.mainMenuTab.removeTab(tab);
  }

  ngOnInit() {
    setTimeout(() => this.tabLabel = this.mainTabs.tabs[0].heading);
  }

}
