import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from './employee';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Department } from './department';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  //retrieve all data from getAll Employees -- http --- HttpClient ---HttpClientModule in app.module
  employees: Employee[];  // all employees
  departments: Department[];
  formData: Employee = new Employee();   // one employee

  constructor(private httpClient: HttpClient) { }

  //Get all employees ---1
  getAllEmployees(): Observable<any> {
    // api/employees ---environment
    return this.httpClient.get(environment.apiUrl + '/api/TblEmployees');
  }

  ///2 
  bindListEmployees() {
    this.httpClient.get(environment.roleUrl + '/api/TblEmployees')
      .toPromise().then(
        response => {
          console.log("from Service");
          console.log(response);
          this.employees = response as Employee[]
        }
      );
  }

  //Get departments for Binding
  bindListDepartments() {
    this.httpClient.get(environment.roleUrl + '/api/TblDepartments')
      .toPromise().then(
        response => {
          console.log("from Service");
          console.log(response);
          this.departments = response as Department[]
        }
      );
  }


  //Get employee by id
  getEmployeeById(id: number): Observable<any> {
    return this.httpClient.get(environment.roleUrl + "/api/tblemployees/" + id);
  }

  //Insert employee
  insertEmployee(employee: Employee): Observable<any> {
    return this.httpClient.post(environment.roleUrl + "/api/tblemployees", employee);
  }

  //Update employee
  updateEmployee(employee: Employee): Observable<any> {
    return this.httpClient.put(environment.roleUrl + "/api/tblemployees", employee);
  }

  //Delete employee
  deleteEmployee(id: number) {
    return this.httpClient.delete(environment.roleUrl + "/api/tblemployees/" + id);
  }
}
