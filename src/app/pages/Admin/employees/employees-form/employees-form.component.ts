import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { BranchService } from 'src/app/services/branch.service';
import { CustomerService } from 'src/app/services/customer.service';
import { DeliveryService } from 'src/app/services/delivery.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-employees-form',
  templateUrl: './employees-form.component.html',
  styleUrls: ['./employees-form.component.css'],
})
export class EmployeesFormComponent implements OnInit {
  id: number = 0;
  roleName: any;
  branches: any;
  employee: any;
  employeeForm!: FormGroup;
  result: any;
  deliveryResult: any;
  adminResult: any;
  custResult: any;
  EmailFlag: boolean = false;
  PhoneFlag: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private branchService: BranchService,
    private loginService: LoginService,
    private adminService: AdminService,
    private deliveryService: DeliveryService,
    private customerService: CustomerService
  ) {}

  ngOnInit(): void {
    this.roleName = this.loginService.user.user_roleName;
    this.branchService
      .getAvailableBranches()
      .subscribe((res) => (this.branches = res));
    this.getAllCustomers();
    this.getAllDelievery();
    this.getAllEmployee();
    this.getAdmin();
    this.employeeForm = this.formBuilder.group({
      name: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[a-zA-Z_ ]{5,25}'),
      ]),
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern('[a-zA-Z0-9]{1,20}@[a-zA-Z]{1,7}.com'),
      ]),
      phone: new FormControl(null, [
        Validators.required,
        Validators.pattern('^01[0125][0-9]{8}$'),
      ]),
      address: new FormControl(null, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(25),
      ]),
      age: new FormControl(null, [
        Validators.required,
        Validators.min(20),
        Validators.max(60),
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
      ]),
      available: new FormControl(),
      role_Id: new FormControl(2),
      branch_Id: new FormControl(null, [Validators.required]),
    });

    this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    if (this.id != 0) {
      this.employeeService.getEmployeeById(this.id).subscribe({
        next: (response) => {
          this.employee = response;
          this.employeeForm.controls['name'].setValue(this.employee.name);
          this.employeeForm.controls['phone'].setValue(this.employee.phone);
          this.employeeForm.controls['email'].setValue(this.employee.email);
          this.employeeForm.controls['age'].setValue(this.employee.age);
          this.employeeForm.controls['password'].setValue(
            this.employee.password
          );
          this.employeeForm.controls['address'].setValue(this.employee.address);
          this.employeeForm.controls['branch_Id'].setValue(
            this.employee.branch_Id
          );
          this.employeeForm.controls['available'].setValue(
            this.employee.available
          );
        },
      });
    }
  }
  get getEmployeeName() {
    return this.employeeForm.controls['name'];
  }

  get getEmployeeEmail() {
    return this.employeeForm.controls['email'];
  }

  get getEmployeePhone() {
    return this.employeeForm.controls['phone'];
  }

  get getEmployeeAddress() {
    return this.employeeForm.controls['address'];
  }

  get getEmployeePassword() {
    return this.employeeForm.controls['password'];
  }

  get getEmplyeeBranch() {
    return this.employeeForm.controls['branch_Id'];
  }

  get getEmployeeAge() {
    return this.employeeForm.controls['age'];
  }

  getAllCustomers() {
    this.customerService.getAllCustomers().subscribe((res: any) => {
      this.custResult = res;
    });
  }

  getAllEmployee() {
    this.employeeService.getALlEmployees().subscribe((res: any) => {
      this.result = res;
    });
  }

  getAllDelievery() {
    this.deliveryService.getAllDelivieries().subscribe((res: any) => {
      this.deliveryResult = res;
    });
  }

  getAdmin() {
    this.adminService.getAdmins().subscribe((res: any) => {
      this.adminResult = res;
    });
  }

  submit(e: Event) {
    e.preventDefault();
    if (this.employeeForm.valid) {
      if (this.id == 0) {
        let Index = this.result.findIndex(
          (item: any) =>
            item.email == this.employeeForm.value.email ||
            item.phone == this.employeeForm.value.phone
        );
        let Index2 = this.custResult.findIndex(
          (item: any) =>
            item.email == this.employeeForm.value.email ||
            item.phone == this.employeeForm.value.phone
        );
        let Index3 = this.deliveryResult.findIndex(
          (item: any) =>
            item.email == this.employeeForm.value.email ||
            item.phone == this.employeeForm.value.phone
        );
        let Index4 = this.adminResult.findIndex(
          (item: any) =>
            item.email == this.employeeForm.value.email ||
            item.phone == this.employeeForm.value.phone
        );
        let EmailIndex1 = this.result.findIndex(
          (item: any) => item.email == this.employeeForm.value.email
        );
        let PhoneIndex1 = this.result.findIndex(
          (item: any) => item.phone == this.employeeForm.value.phone
        );
        let EmailIndex2 = this.custResult.findIndex(
          (item: any) => item.email == this.employeeForm.value.email
        );
        let PhoneIndex2 = this.custResult.findIndex(
          (item: any) => item.phone == this.employeeForm.value.phone
        );
        let EmailIndex3 = this.deliveryResult.findIndex(
          (item: any) => item.email == this.employeeForm.value.email
        );
        let PhoneIndex3 = this.deliveryResult.findIndex(
          (item: any) => item.phone == this.employeeForm.value.phone
        );
        let EmailIndex4 = this.adminResult.findIndex(
          (item: any) => item.email == this.employeeForm.value.email
        );
        let PhoneIndex4 = this.adminResult.findIndex(
          (item: any) => item.phone == this.employeeForm.value.phone
        );

        if (Index != -1 || Index2 != -1 || Index3 != -1 || Index4 != -1) {
          if (
            EmailIndex1 != -1 ||
            EmailIndex3 != -1 ||
            EmailIndex2 != -1 ||
            EmailIndex4 != -1
          ) {
            this.EmailFlag = true;
          } else {
            this.EmailFlag = false;
          }

          if (
            PhoneIndex1 != -1 ||
            PhoneIndex2 != -1 ||
            PhoneIndex3 != -1 ||
            PhoneIndex4 != -1
          ) {
            this.PhoneFlag = true;
          } else {
            this.PhoneFlag = false;
          }
        } else {
          this.employeeForm.controls['available'].setValue(true);
          this.employeeService.addEmployee(this.employeeForm.value).subscribe();
          this.employeeForm.reset();
          alert('Employee Added Succsess');
          this.router.navigate(['/admin/Employees']);
          window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        }
      } else {
        this.employeeService
          .editEmployee(this.id, this.employeeForm.value)
          .subscribe();
        alert('Employee Updated Succsess');

        this.router.navigate(['/admin/Employees']);
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      }
    } else {
      this.markAllControlsAsTouched();
    }
  }
  markAllControlsAsTouched(): void {
    for (const controlName in this.employeeForm.controls) {
      if (this.employeeForm.controls.hasOwnProperty(controlName)) {
        this.employeeForm.controls[controlName].markAsTouched();
      }
    }
  }
}
