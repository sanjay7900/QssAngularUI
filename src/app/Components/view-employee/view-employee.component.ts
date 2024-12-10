import { CommonModule } from '@angular/common';
import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterEmployeePipe } from '../../Pipes/filter-employee.pipe';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { Employee } from '../../Model/Employee';
import { Route, Router, RouterLink } from '@angular/router';
import { HttpContextService } from '../../Services/HttpContextService';
import { baseUri, deleteEmployeeUri, getAllDepartmentsUri, getAllEmployeesUri } from '../../Environments/environment';
import { ApiResponse } from '../../Model/ApiResponse';
import { ToastrService } from 'ngx-toastr';
import { allDeparments } from '../../Model/Departments';
import { FilterdepartmentPipe } from '../../Pipes/filterdepartment.pipe';
@Component({
  selector: 'app-view-employee',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,FilterEmployeePipe,FilterdepartmentPipe],
  providers:[HttpContextService],
  templateUrl: './view-employee.component.html',
  styleUrl: './view-employee.component.scss'
})
export class ViewEmployeeComponent implements OnInit{
 
  searchTerm!:string
  filteredString!:string
  searchSubject: Subject<string> = new Subject<string>();
  departments!:allDeparments[]
  constructor(private httpService:HttpContextService,private route:Router,
    private toastr:ToastrService
  )
  {

  }
  tableHeaders: string[] = ['ID', 'Name', 'Salary', 'Position', 'Email', 'Department'];
  tableData: Employee[] = [
  // { id: '1', name: 'John Doe', salary: 50000, position: 'Software Engineer', email: 'john.doe@example.com', department: 1 },
  // { id: '2', name: 'Jane Smith', salary: 60000, position: 'Product Manager', email: 'jane.smith@example.com', department: 2 },
  // { id: '3', name: 'Alice Johnson', salary: 55000, position: 'Designer', email: 'alice.johnson@example.com', department: 3 },
  // { id: '4', name: 'Bob Brown', salary: 65000, position: 'Data Scientist', email: 'bob.brown@example.com', department: 4 },
  // { id: '5', name: 'Charlie White', salary: 48000, position: 'HR Manager', email: 'charlie.white@example.com', department: 5 }
];
  ngOnInit(): void {
    this.getAllEmployees();
    this.getAllDepartments();
  }
 
  UpdateLinK(value:string)
  {
    this.route.navigate(['/Update',value]);
  }
  getAllEmployees()
  {
    let url = baseUri + getAllEmployeesUri;
    this.httpService.Get<ApiResponse<Employee[]>>(url).subscribe(res => 
    {
      this.tableData = res.data
      console.log(res.data)
    },
    err =>
    {
      this.toastr.error("Internal Server error");
    }
    )
  }
  AddEmployee()
  {
    this.route.navigate(['/Create'])
  }
  deleteEmployee(id:string)
  {
    let url = baseUri + deleteEmployeeUri;
    this.httpService.Delete<ApiResponse<Employee>>(url,{guid:id}).subscribe(res =>{
      if(res == null || res.statusCode != 200 || res.data == null)
      {
        this.toastr.info(res.message);
      }
      this.toastr.success(res.message);
      this.getAllEmployees();
    },
    err =>
    {
      this.toastr.error("Internal server error");
    })
  }
  getAllDepartments()
  {
    debugger
    let url = baseUri + getAllDepartmentsUri
    this.httpService.Get<ApiResponse<allDeparments[]>>(url).subscribe(res =>
    {
      if(res.statusCode != 200 || res.data == null)
      {
        this.toastr.info(res.message);
      }
      this.departments = res.data;
    },
    err =>
    {
      this.toastr.error("Internal server error");
    }
    ) 
  }
}
