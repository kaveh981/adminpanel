import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NewEmployeeComponent } from '../employee-new/new-employee.component';
import { Observable } from 'rxjs/Observable';

@Injectable()

export class EmployeeService {

  constructor(private http: HttpClient) { }

  employeeList(): Observable<IEmployee[]> {
    return this.http.get<IEmployee[]>('http://mgm-mgm.193b.starter-ca-central-1.openshiftapps.com/employees');
  }

  getEmployeeById(employeeId: number): Observable<IEmployee> {
    return this.http.get<IEmployee>(`http://mgm-mgm.193b.starter-ca-central-1.openshiftapps.com/employees/${employeeId}`);
  }

  updateEmployee(editedEmployee: UpdateEmployee) {
    return this.http.put('http://mgm-mgm.193b.starter-ca-central-1.openshiftapps.com/employees', editedEmployee);
  }

  updateEmployeeEmail(editedEmployeeEmail: UpdateEmployeeEmail): Observable<ResponseDetails> {
    return this.http.put<ResponseDetails>('http://mgm-mgm.193b.starter-ca-central-1.openshiftapps.com/employees/email',
      editedEmployeeEmail);
  }

  updateEmployeePassword(editedEmployeePassword: UpdateEmployeePassword): Observable<ResponseDetails> {
    return this.http.put<ResponseDetails>('http://mgm-mgm.193b.starter-ca-central-1.openshiftapps.com/employees/password',
    editedEmployeePassword);
  }

  postEmployee(newEmployee: IEmployee) {
    return this.http.post('http://mgm-mgm.193b.starter-ca-central-1.openshiftapps.com/employees', newEmployee);
  }

  deleteEmployee(employeeId) {
    return this.http.delete<IEmployee>(`http://mgm-mgm.193b.starter-ca-central-1.openshiftapps.com/employees/${employeeId}`);
  }

}
