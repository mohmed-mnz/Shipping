import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { BranchService } from 'src/app/services/branch.service';
import { CustomerService } from 'src/app/services/customer.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { DeliveryService } from 'src/app/services/delivery.service';
import { LoginService } from 'src/app/services/login.service';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css'],
})
export class CustomerFormComponent implements OnInit {
  roleName: any;
  customerForm!: FormGroup;
  id: number = 0;
  branches: any;
  customer: any;
  EmailFlag: boolean = false;
  PhoneFlag: boolean = false;
  result: any;
  empResult: any;
  deliveryResult: any;
  adminResult: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private customerService: CustomerService,
    private branchService: BranchService,
    private employeeService: EmployeeService,
    private deliveryService: DeliveryService,
    private formBuilder: FormBuilder,
    private loginSerivice: LoginService,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.roleName = this.loginSerivice.user.user_roleName;
    this.getAllCustomers();
    this.getAllDelievery();
    this.getAllEmployee();
    this.getAdmin();
    this.branchService
      .getAvailableBranches()
      .subscribe((result) => (this.branches = result));
    this.customerForm = this.formBuilder.group({
      name: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z_ ]{5,25}'),
      ]),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern('^01[0125][0-9]{8}$'),
      ]),
      address: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(25),
      ]),
      branch_Id: new FormControl('', Validators.required),
      store_Name: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_ ]{5,25}'),
      ]),
      special_Discount_Perc: new FormControl('', [
        Validators.required,
        Validators.min(0),
        Validators.max(100),
      ]),
      refused_Order_Perc: new FormControl('', [
        Validators.required,
        Validators.min(0),
        Validators.max(100),
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-zA-Z0-9]{1,20}@[a-zA-Z]{1,7}.com'),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      available: new FormControl(),
      role_Id: new FormControl(3),
    });

    this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    if (this.id != 0) {
      this.customerService.getCustomerById(this.id).subscribe({
        next: (response) => {
          this.customer = response;
          this.customerForm.controls['available'].setValue(
            this.customer.available
          );
          this.customerForm.controls['name'].setValue(this.customer.name);
          this.customerForm.controls['phone'].setValue(this.customer.phone);
          this.customerForm.controls['address'].setValue(this.customer.address);
          this.customerForm.controls['branch_Id'].setValue(
            this.customer.branch_Id
          );
          this.customerForm.controls['store_Name'].setValue(
            this.customer.store_Name
          );
          this.customerForm.controls['special_Discount_Perc'].setValue(
            this.customer.special_Discount_Perc
          );
          this.customerForm.controls['refused_Order_Perc'].setValue(
            this.customer.refused_Order_Perc
          );
          this.customerForm.controls['email'].setValue(this.customer.email);
          this.customerForm.controls['password'].setValue(
            this.customer.password
          );
        },
      });
    }
  }

  getAllCustomers() {
    this.customerService.getAllCustomers().subscribe((res: any) => {
      this.result = res;
    });
  }

  getAllEmployee() {
    this.employeeService.getALlEmployees().subscribe((res: any) => {
      this.empResult = res;
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

  get getCustomerName() {
    return this.customerForm.controls['name'];
  }

  get getCustomerPhone() {
    return this.customerForm.controls['phone'];
  }

  get getCustomerEmail() {
    return this.customerForm.controls['email'];
  }

  get getCustomerPassword() {
    return this.customerForm.controls['password'];
  }

  get getCustomerbranch() {
    return this.customerForm.controls['branch_Id'];
  }

  get getCustomerSpecialPercentage() {
    return this.customerForm.controls['special_Discount_Perc'];
  }

  get getCustomerRefusedPercentage() {
    return this.customerForm.controls['refused_Order_Perc'];
  }
  get getstoreName() {
    return this.customerForm.controls['store_Name'];
  }

  get getCustomerAddress() {
    return this.customerForm.controls['address'];
  }

  get getavailable() {
    return this.customerForm.controls['available'];
  }

  get getRoleID() {
    return this.customerForm.controls['role_Id'];
  }

  submit(e: Event) {
    e.preventDefault();
    if (this.customerForm.valid) {
      if (this.id == 0) {
        let Index = this.result.findIndex(
          (item: any) =>
            item.email == this.customerForm.value.email ||
            item.phone == this.customerForm.value.phone
        );
        let Index2 = this.empResult.findIndex(
          (item: any) =>
            item.email == this.customerForm.value.email ||
            item.phone == this.customerForm.value.phone
        );
        let Index3 = this.deliveryResult.findIndex(
          (item: any) =>
            item.email == this.customerForm.value.email ||
            item.phone == this.customerForm.value.phone
        );
        let Index4 = this.adminResult.findIndex(
          (item: any) =>
            item.email == this.customerForm.value.email ||
            item.phone == this.customerForm.value.phone
        );
        let EmailIndex1 = this.result.findIndex(
          (item: any) => item.email == this.customerForm.value.email
        );
        let PhoneIndex1 = this.result.findIndex(
          (item: any) => item.phone == this.customerForm.value.phone
        );
        let EmailIndex2 = this.empResult.findIndex(
          (item: any) => item.email == this.customerForm.value.email
        );
        let PhoneIndex2 = this.empResult.findIndex(
          (item: any) => item.phone == this.customerForm.value.phone
        );
        let EmailIndex3 = this.deliveryResult.findIndex(
          (item: any) => item.email == this.customerForm.value.email
        );
        let PhoneIndex3 = this.deliveryResult.findIndex(
          (item: any) => item.phone == this.customerForm.value.phone
        );
        let EmailIndex4 = this.adminResult.findIndex(
          (item: any) => item.email == this.customerForm.value.email
        );
        let PhoneIndex4 = this.adminResult.findIndex(
          (item: any) => item.phone == this.customerForm.value.phone
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
          this.customerForm.controls['available'].setValue(true);
          this.customerService.addCustomer(this.customerForm.value).subscribe();
          this.customerForm.reset();
          alert('Customer Added Succsess');
          this.router.navigate(['/admin/customers']);
          window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        }
      } else {
        this.customerService
          .editCustomer(this.id, this.customerForm.value)
          .subscribe();
        alert('Customer Updated Succsess');

        this.router.navigate(['/admin/customers']);
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      }
    } else {
      this.markAllControlsAsTouched();
    }
    
  }

  markAllControlsAsTouched(): void {
    for (const controlName in this.customerForm.controls) {
      if (this.customerForm.controls.hasOwnProperty(controlName)) {
        this.customerForm.controls[controlName].markAsTouched();
      }
    }
  }
}
