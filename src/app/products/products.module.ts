import { NgModule } from '@angular/core';
import { ModuleSharedModule } from '../module-shared/module-shared.module';
import { ProductsMenuComponent } from './products-menu/products-menu.component';
import { ProductCategoryComponent } from './product-category/product-category.component';
import { ProductService } from './shared/product.service';

@NgModule({
  imports: [
    ModuleSharedModule
  ],
  providers: [ProductService],
  declarations: [ProductsMenuComponent, ProductCategoryComponent],
  exports: [ProductsMenuComponent]
})
export class ProductsModule { }
