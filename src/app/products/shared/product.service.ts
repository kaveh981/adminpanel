import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ApiService } from '../../shared-services/api.service';

@Injectable()

export class ProductService {

  constructor(private http: ApiService) { }

  getProductCategories(parentId?): Observable<any> {
    return this.http.get<ProductCategory[]>(`products/category/parent/${parentId}`);
  }

  getParentCategoriesById(id): Observable<any> {
    return this.http.get<ProductCategory[]>(`products/category/parents/${id}`);
  }

  getProductCategoryById(id?): Observable<any> {
    return this.http.get<ProductCategory[]>(`products/category/${id}`);
  }

  postProductCategory(productCategory: ProductCategory) {
    return this.http.post(`products/category`, productCategory);
  }

  updateProductCategory(productCategory: ProductCategory) {
    return this.http.put(`products/category`, productCategory);
  }

  deleteProductCategory(id) {
    return this.http.delete(`products/category/${id}`);
  }

  getProductById(id): Observable<any> {
    return this.http.get<ProductCategory[]>(`products/${id}`);
  }

  postProduct(product: Product) {
    return this.http.post(`products`, product);
  }

  productList(filter?: ProductFilter): Observable<any[]> {
    return this.http.get<any[]>(`products`, {
      params: {
        sort: filter.pagination.sort,
        take: filter.pagination.take,
        skip: filter.pagination.skip,
        order: filter.pagination.order,
        name: filter.name,
        status: filter.status,
        categoryId: filter.categoryId
      }
    });
  }

  deleteProduct(id) {
    return this.http.delete(`products/${id}`);
  }

  updateProduct(product: Product) {
    console.log(product);
    return this.http.put(`products`, product);
  }


}
