import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { IEmployee } from './employee.infc';
import 'rxjs/add/operator/map';
import { NewEmployeeComponent } from '../employee-new/new-employee.component';



@Injectable()
export class EmployeeService {

  constructor(private http: HttpClient) { }

  postEmployee(newEmployee: IEmployee) {
    // console.log(JSON.stringify(newEmployee));
    return this.http.post("http://localhost:3000/employees", newEmployee);
  }

}
