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

}
