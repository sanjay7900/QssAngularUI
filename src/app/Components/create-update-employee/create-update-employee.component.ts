import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Employee } from '../../Model/Employee';
import { CommonModule } from '@angular/common';
import { HttpContextService } from '../../Services/HttpContextService';
import { baseUri, createEmployeeUri, getAllDepartmentsUri, getEmployeeByIdUri, updateEmployeeUri } from '../../Environments/environment';
import { ApiResponse } from '../../Model/ApiResponse';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { allDeparments} from '../../Model/Departments';


@Component({
  selector: 'app-create-update',
  templateUrl: './create-update-employee.component.html',
  standalone:true,
  imports:[ReactiveFormsModule,CommonModule],
  providers:[HttpContextService],
  styleUrls: ['./create-update-employee.component.scss']
})
export class CreateUpdateComponent implements OnInit,OnDestroy {
  employeeForm: FormGroup;
  isEditMode: boolean = false;
  employeeToEdit: Employee | null = null;
  createSubscription:Subscription = new Subscription();
  editSubscription:Subscription = new Subscription();
  departments!:allDeparments[];

  constructor(private httpService:HttpContextService,private router :Router,
    private toastr:ToastrService,private route: ActivatedRoute) {
    this.employeeForm = new FormGroup({
      id: new FormControl(''),
      name: new FormControl('', Validators.required),
      salary: new FormControl('', [Validators.required, Validators.min(1)]),
      position: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      department: new FormControl('', [Validators.required, Validators.min(1)])
    });
  }
  ngOnInit(): void {
    let currentUrl = this.router.url;
    if(currentUrl.includes('Update'))
    {
      this.route.paramMap.subscribe(params => {
        let userId = params.get('id');
        if(!userId)
        {
          this.router.navigate(['/viewEmployees'])
          return
        }
        console.log(userId)
        this.isEditMode = true;
        this.getEmployeeById(userId)
      });    
    }
    this.getAllDepartments();
  }
  ngOnDestroy(): void {
    this.createSubscription.unsubscribe;
    this.editSubscription.unsubscribe;
  }

  onSubmit(): void {
    if (this.employeeForm.valid) {
      const employeeData: Employee = this.employeeForm.value;
      if (this.isEditMode) {
        this.updateEmployee(employeeData);
      } else {
        this.createEmployee(employeeData);
      }
    } else {
      console.log('Form is invalid');
    }
    
  }

  createEmployee(employee: Employee): void {
    let url = baseUri + createEmployeeUri;
    this.createSubscription =  this.httpService.Post<ApiResponse<Employee>>(url,employee).subscribe(res =>{
      if(res.statusCode != 200 || res.data == null)
      {
        this.toastr.info(res.message);
        return;
      }
      this.toastr.success(res.message);
      //this.router.navigate(['/viewEmployees'])
    },
    err => {
      this.toastr.error("Internal Server error");
    }
    )
  }

  updateEmployee(employee: Employee): void {
    let url = baseUri + updateEmployeeUri;
    this.editSubscription = this.httpService.Put<ApiResponse<Employee>>(url,employee).subscribe(res =>{
      if(res.statusCode != 200 || res.data == null)
        {
          this.toastr.info(res.message);
          return;
        }
        this.toastr.success(res.message);
        setTimeout(() => {
          this.router.navigate(['/viewEmployees']);
        }, 2000); 
      },
      err => {
        this.toastr.error("Internal Server error");
      }
    )
  }
  getEmployeeById(id:string):void
  {
    let url = baseUri + getEmployeeByIdUri;
    this.httpService.Get<ApiResponse<Employee>>(url,{guid:id}).subscribe(res => 
    {
      if(res.statusCode != 200 || res.data === null)
      {
          this.toastr.info(res.message)
          return
      }
      console.log(res)
      this.employeeForm.setValue({ ...res.data})
      console.log(this.employeeForm)
      this.employeeForm.controls['department'].setValue(res.data.department)
    },
    err=>
    {
      this.toastr.info("Internal Server Error")
    }
  )} 
  backToList()
  {
    this.router.navigate([''])
  }
  getAllDepartments()
  {
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

