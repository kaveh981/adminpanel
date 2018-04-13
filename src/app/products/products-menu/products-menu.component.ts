import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductCategoryComponent } from '../product-category/product-category.component';
import { ProductNewComponent } from '../product-new/product-new.component';
import { AuthService } from '../../shared-services/auth.service';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-products-menu',
  templateUrl: './products-menu.component.html',
  styleUrls: ['./products-menu.component.css']
})
export class ProductsMenuComponent implements OnInit {
  @ViewChild('subTab')
  matTabsModule: MatTabsModule;
  @ViewChild(ProductCategoryComponent)
  productCategoryComponent: ProductCategoryComponent;
  @ViewChild(ProductNewComponent)
  productNewComponent: ProductNewComponent;

  tabIndex = 0;
  tabLabel = '';

  changeTabEvent(e) {
    console.log(e.tab);
    this.tabIndex = e.index;
    this.tabLabel = e.tab.textLabel;
    // if (e.tab.textLabel === 'Employees List' && this.listEmployeeComponent) {
    //   this.listEmployeeComponent.subscribeMethod();
    // }
  }
  constructor(private authService: AuthService) { }

  ngOnInit() {
    setTimeout(() => this.tabLabel = this.matTabsModule['_tabs'].first.textLabel);
  }

}
