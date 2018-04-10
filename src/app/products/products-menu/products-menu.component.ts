import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductCategoryComponent } from '../product-category/product-category.component';
import { AuthService } from '../../shared-services/auth.service';

@Component({
  selector: 'app-products-menu',
  templateUrl: './products-menu.component.html',
  styleUrls: ['./products-menu.component.css']
})
export class ProductsMenuComponent implements OnInit {
  @ViewChild(ProductCategoryComponent)
  productCategoryComponent: ProductCategoryComponent;

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
  }

}
