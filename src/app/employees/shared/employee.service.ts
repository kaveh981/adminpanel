import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Response } from '@angular/http';
import { IEmployee } from './employee.infc';
import 'rxjs/add/operator/map';
import { NewEmployeeComponent } from '../employee-new/new-employee.component';
import { Observable } from 'rxjs/Observable';

@Injectable()

export class EmployeeService {

  constructor(private http: HttpClient) { }

  employeeList(): Observable<IEmployee[]> {
    return this.http.get<IEmployee[]>('http://mgm-mgm.193b.starter-ca-central-1.openshiftapps.com/employees');
  }

  postEmployee(newEmployee: IEmployee) {
    // console.log(JSON.stringify(newEmployee));
    return this.http.post("http://localhost:3000/employees", newEmployee);
  }

}
