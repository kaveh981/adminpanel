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

  postProductCategory(productCategory: ProductCategory) {
    return this.http.post(`products/category`, productCategory);
  }

  updateEmployee(editedEmployee: UpdateEmployee) {
    return this.http.put(`employees`, editedEmployee);
  }

  deleteRoute(routeId) {
    return this.http.delete(`routes/${routeId}`);
  }

}
