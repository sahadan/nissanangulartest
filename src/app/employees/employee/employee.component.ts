import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from 'src/app/shared/employee.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  //Declare variable
  empId: number;

  constructor(public empService: EmployeeService,
    private route: ActivatedRoute,
    private toastrService: ToastrService ) { }

  ngOnInit(): void {
    //get departments
    this.empService.bindListDepartments();

    //get empId from ActivateRoute
    this.empId = this.route.snapshot.params['empId'];

    //getEmployeeById
    if (this.empId != 0 || this.empId != null) {
      //get Employee
      this.empService.getEmployeeById(this.empId).subscribe(
        result => {
          console.log(result);

          //format the date : yyyy-MM-dd
          var datePipe = new DatePipe("en-UK");
          let formatedDate: any = datePipe.transform(result.DateOfJoining, 'yyyy-MM-dd');
          result.DateOfJoining = formatedDate;

          //assign this result to empService formData
          this.empService.formData = Object.assign({}, result);
        },
        error => {
          console.log(error)
        }
      );
    }

  }

  //Submit Form
  onSubmit(form: NgForm) {
    console.log(form.value);
    let addId = this.empService.formData.EmployeeId;

    //Insert or Update
    if (addId == 0 || addId == null) {
      // INSERT
      this.insertEmployeeRecord(form);
    }
    else {
      //UPDATE
      this.updateEmployeeRecord(form);
    }
  }

  // INSERT Method
  insertEmployeeRecord(form?: NgForm) {
    console.log("Inserting a record...");
    this.empService.insertEmployee(form.value).subscribe(
      (result) => {
        console.log(result);
         //call resetForm for clean the contents
         this.resetForm(form);
         this.toastrService.success('Employee record has been inserted', 'EmpApp v2022');
      },
      (error) => {
        console.log(error);
      }
    );
  }

  //UPDATE
  updateEmployeeRecord(form?: NgForm) {
    console.log("Updating a record...");
    this.empService.updateEmployee(form.value).subscribe(
      (result) => {
        console.log(result);

        //call resetForm for clean the contents
        this.resetForm(form);
        this.toastrService.success('Employee record has been updated', 'EmpApp v2022');
      },
      (error) => {
        console.log(error);
      }
    );
  }

  //clear all contents after submit --Initialization
  resetForm(form?: NgForm) {
    if (form != null) {
      form.resetForm();
    }
  }

}
