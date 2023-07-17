import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { BranchService } from 'src/app/services/branch.service';
import { CustomerService } from 'src/app/services/customer.service';
import { DeliveryService } from 'src/app/services/delivery.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-deliveries-form',
  templateUrl: './deliveries-form.component.html',
  styleUrls: ['./deliveries-form.component.css'],
})
export class DeliveriesFormComponent implements OnInit {
  DeleveryForm!: FormGroup;
  roleName: any;
  id: number = 0;
  delivery: any;
  branches: any;
  EmailFlag: boolean = false;
  PhoneFlag: boolean = false;
  result: any;
  empResult: any;
  custResult: any;
  adminResult: any;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private branchService: BranchService,
    private activatedRoute: ActivatedRoute,
    private deliveryService: DeliveryService,
    private loginService: LoginService,
    private employeeService: EmployeeService,
    private customerService: CustomerService,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.roleName = this.loginService.user.user_roleName;
    this.getAllDeliveries();
    this.getAllEmployee();
    this.getAllCustomers();
    this.getAdmin();
    this.DeleveryForm = this.formBuilder.group({
      name: [
        '',
        [Validators.required, Validators.pattern('^[a-zA-Z_ ]{5,25}$')],
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-zA-Z0-9]{1,20}@[a-zA-Z]{1,7}.com'),
        ],
      ],
      password: ['', [Validators.minLength(8), Validators.required]],
      phone: [
        '',
        [Validators.required, Validators.pattern('^01[0125][0-9]{8}$')],
      ],
      address: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(25),
        ],
      ],
      company_Perc: [
        '',
        [Validators.required, Validators.min(0), Validators.max(100)],
      ],
      available: [],
      role_Id: [4],
      branch_Id: ['', [Validators.required]],
    });

    this.branchService.getAvailableBranches().subscribe((result: any) => {
      this.branches = result;
    });

    this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));

    if (this.id != 0) {
      this.deliveryService.GetDeliveryByID(this.id).subscribe({
        next: (response) => {
          this.delivery = response;
          this.DeleveryForm.controls['available'].setValue(
            this.delivery.available
          );

          this.DeleveryForm.controls['name'].setValue(this.delivery.name);

          this.DeleveryForm.controls['phone'].setValue(this.delivery.phone);

          this.DeleveryForm.controls['address'].setValue(this.delivery.address);

          this.DeleveryForm.controls['branch_Id'].setValue(
            this.delivery.branch_Id
          );

          this.DeleveryForm.controls['company_Perc'].setValue(
            this.delivery.companyPercentage
          );

          this.DeleveryForm.controls['email'].setValue(this.delivery.email);

          this.DeleveryForm.controls['password'].setValue(
            this.delivery.password
          );
        },
      });
    }
  }

  getAllDeliveries() {
    this.deliveryService.getAllDelivieries().subscribe((res: any) => {
      this.result = res;
    });
  }
  getAllCustomers() {
    this.customerService.getAllCustomers().subscribe((res: any) => {
      this.custResult = res;
    });
  }

  getAllEmployee() {
    this.employeeService.getALlEmployees().subscribe((res: any) => {
      this.empResult = res;
    });
  }

  getAdmin() {
    this.adminService.getAdmins().subscribe((res: any) => {
      this.adminResult = res;
    });
  }

  submit(e: any) {
    e.preventDefault();
    if (this.DeleveryForm.valid) {
      if (this.id == 0) {
        let Index = this.result.findIndex(
          (item: any) =>
            item.email == this.DeleveryForm.value.email ||
            item.phone == this.DeleveryForm.value.phone
        );
        let Index2 = this.empResult.findIndex(
          (item: any) =>
            item.email == this.DeleveryForm.value.email ||
            item.phone == this.DeleveryForm.value.phone
        );
        let Index3 = this.custResult.findIndex(
          (item: any) =>
            item.email == this.DeleveryForm.value.email ||
            item.phone == this.DeleveryForm.value.phone
        );
        let Index4 = this.adminResult.findIndex(
          (item: any) =>
            item.email == this.DeleveryForm.value.email ||
            item.phone == this.DeleveryForm.value.phone
        );

        let EmailIndex1 = this.result.findIndex(
          (item: any) => item.email == this.DeleveryForm.value.email
        );
        let PhoneIndex1 = this.result.findIndex(
          (item: any) => item.phone == this.DeleveryForm.value.phone
        );
        let EmailIndex2 = this.empResult.findIndex(
          (item: any) => item.email == this.DeleveryForm.value.email
        );
        let PhoneIndex2 = this.empResult.findIndex(
          (item: any) => item.phone == this.DeleveryForm.value.phone
        );
        let EmailIndex3 = this.custResult.findIndex(
          (item: any) => item.email == this.DeleveryForm.value.email
        );
        let PhoneIndex3 = this.custResult.findIndex(
          (item: any) => item.phone == this.DeleveryForm.value.phone
        );
        let EmailIndex4 = this.adminResult.findIndex(
          (item: any) => item.email == this.DeleveryForm.value.email
        );
        let PhoneIndex4 = this.adminResult.findIndex(
          (item: any) => item.phone == this.DeleveryForm.value.phone
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

          console.log(this.EmailFlag, this.PhoneFlag);
        } else {
          this.DeleveryForm.controls['available'].setValue(true);
          this.deliveryService.addDelivery(this.DeleveryForm.value).subscribe();
          this.DeleveryForm.reset();
          alert('Delivery Added Succsess');
          this.router.navigate(['/admin/Deliveries']);
          window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        }
      } else {
        this.deliveryService
          .updateDelivery(this.id, this.DeleveryForm.value)
          .subscribe();
        alert('Delivery Updated Succsess');

        this.router.navigate(['/admin/Deliveries']);
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      }
    } else {
      this.markAllControlsAsTouched();
    }
  }

  markAllControlsAsTouched(): void {
    for (const controlName in this.DeleveryForm.controls) {
      if (this.DeleveryForm.controls.hasOwnProperty(controlName)) {
        this.DeleveryForm.controls[controlName].markAsTouched();
      }
    }
  }
}
