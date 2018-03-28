import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NewEmployeeComponent } from '../employee-new/new-employee.component';
import { Observable } from 'rxjs/Observable';
import { ApiService } from '../../shared-services/api.service';

@Injectable()

export class EmployeeService {

  routh = 'http://localhost:8080';
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

}
