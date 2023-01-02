import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/shared/employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {

  //declare variable
  page: number =1;
  filter: string;

  constructor(public employeeService: EmployeeService,
    private router: Router) { }

  ngOnInit(): void {    // Life Cycle Hook ---Initialize
    // Life Cycle Hook
    console.log("Welcome to LifeCycle Hook");
    //1
    //this.getEmployees();
    //2
    this.employeeService.bindListEmployees();
  }

  // 1
  //Get All Employees
  getEmployees(){
    // call service method
    this.employeeService.getAllEmployees().subscribe(
      response =>{
        console.log('retrieving from list');
        console.log(response);
      },
      error=>{
        console.log('something wrong');
        console.log(error);
      }
    );
  }

  // Edit Employee
  updateEmployee(empId: number){
    console.log(empId);
    // navigate to Edit form with selected employee details
    this.router.navigate(['employee',empId])
  }

  //Delete Employee
  deleteEmployee(empId: number){
    if(confirm('Are you sure you want to DELETE this record?')){
      this.employeeService.deleteEmployee(empId).subscribe(
        response=>{
          this.employeeService.bindListEmployees();
        },
        error=>{
          console.log(error);
        });
    }
  }
}
