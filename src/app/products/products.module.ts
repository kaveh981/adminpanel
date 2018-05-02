import { NgModule } from '@angular/core';
import { ModuleSharedModule } from '../module-shared/module-shared.module';
import { ProductsMenuComponent } from './products-menu/products-menu.component';
import { ProductCategoryComponent } from './product-category/product-category.component';
import { ProductService } from './shared/product.service';
import { ProductNewComponent } from './product-new/product-new.component';
import { TreeComponent } from '../shared-components/tree/tree.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductMenuComponent } from './product-menu/product-menu.component';

@NgModule({
  imports: [
    ModuleSharedModule
  ],
  providers: [ProductService],
  declarations: [ProductsMenuComponent, ProductCategoryComponent, ProductNewComponent, TreeComponent,
    ProductsListComponent, ProductEditComponent, ProductMenuComponent],
  exports: [ProductsMenuComponent, ProductMenuComponent]
})
export class ProductsModule { }
