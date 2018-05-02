import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { AuthService } from '../../shared-services/auth.service';
import { MatTabsModule } from '@angular/material/tabs';
import { ProductEditComponent } from '../product-edit/product-edit.component';

@Component({
  selector: 'app-product-menu',
  templateUrl: './product-menu.component.html',
  styleUrls: ['./product-menu.component.css']
})
export class ProductMenuComponent implements OnInit {
  @Input()
  tabId: number;
  @ViewChild('subTab')
  matTabsModule: MatTabsModule;
  @ViewChild(ProductEditComponent)
  productEditComponent: ProductEditComponent;

  tabLabel;

  changeTabEvent(e) {
    this.tabLabel = e.tab.textLabel;
  }

  constructor(private authService: AuthService) { }

  ngOnInit() {
    setTimeout(() => this.tabLabel = this.matTabsModule['_tabs'].first.textLabel);
  }

}
