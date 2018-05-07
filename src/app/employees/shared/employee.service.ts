import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ApiService } from '../../shared-services/api.service';

@Injectable()

export class EmployeeService {

  constructor(private http: ApiService) { }

  employeeList(): Observable<IEmployee[]> {
    return this.http.get<IEmployee[]>(`employees`);
  }

  getEmployeeById(employeeId: number): Observable<IEmployee> {
    return this.http.get<IEmployee>(`employees/${employeeId}`);
  }

  updateEmployee(editedEmployee: UpdateEmployee) {
    return this.http.put(`employees`, editedEmployee);
  }

  updateEmployeeEmail(editedEmployeeEmail: UpdateEmployeeEmail): Observable<ResponseDetails> {
    return this.http.put<ResponseDetails>(`employees/email`,
      editedEmployeeEmail);
  }

  updateEmployeePassword(editedEmployeePassword: UpdateEmployeePassword): Observable<ResponseDetails> {
    return this.http.put<ResponseDetails>(`employees/password`,
      editedEmployeePassword);
  }

  postEmployee(newEmployee: AddEmployee) {
    return this.http.post(`employees`, newEmployee);
  }

  deleteEmployee(employeeId) {
    return this.http.delete<IEmployee>(`employees/${employeeId}`);
  }

  postNewRole(role) {
    return this.http.post(`roles`, role);
  }

  getRolesForUser(employeeId): Observable<Role[]> {
    console.log(employeeId);
    return this.http.get<Role[]>(`roles/employee/${employeeId}`);
  }

  deleteRole(roleId) {
    return this.http.delete(`roles/${roleId}`);
  }

  updateRole(role: Role): Observable<ResponseDetails> {
    console.log(role);
    return this.http.put<ResponseDetails>(`roles`,
      role);
  }

  getRoleById(id: number): Observable<Role> {
    return this.http.get<Role>(`roles/${id}`);
  }

  addOrRemoveUserRole(assignRole) {
    console.log(assignRole);
    return this.http.post(`employees/role`, assignRole);
  }

  getRoutes(): Observable<Route[]> {
    return this.http.get<Role[]>(`routes`);
  }

  postNewRoute(route) {
    return this.http.post(`routes`, route);
  }

  deleteRoute(routeId) {
    return this.http.delete(`routes/${routeId}`);
  }

  getRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(`roles`);
  }

  getRouteById(id: number): Observable<Route> {
    return this.http.get<Route>(`routes/${id}`);
  }

  updateRoute(route: Route): Observable<ResponseDetails> {
    console.log(route);
    return this.http.put<ResponseDetails>(`routes`,
      route);
  }

  getNodesByParentId(parentId): Observable<any> {
    return this.http.get<ProductCategory[]>(`roles/parent/${parentId}`);
  }

  getNodesByParentIdForEmployee(parent): Observable<any> {
    return this.http.get<ProductCategory[]>(`roles/parent/${parent.parentId}/employee/${parent.employeeId}`);
  }

  getParentNodesById(id): Observable<any> {
    return this.http.get<ProductCategory[]>(`roles/parents/${id}`);
  }

  getNodeById(id?): Observable<any> {
    return this.http.get<ProductCategory[]>(`roles/${id}`);
  }

  addNode(productCategory: ProductCategory) {
    return this.http.post(`roles`, productCategory);
  }

  updateNode(productCategory: ProductCategory) {
    return this.http.put(`roles`, productCategory);
  }

  deleteNode(id) {
    return this.http.delete(`roles/${id}`);
  }

}
