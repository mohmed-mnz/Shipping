import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BranchService } from 'src/app/services/branch.service';
import { CityService } from 'src/app/services/city.service';
import { CustomerService } from 'src/app/services/customer.service';
import { GovernroateService } from 'src/app/services/governroate.service';
import { LoginService } from 'src/app/services/login.service';
import { OrderCustomerService } from 'src/app/services/order-customer.service';
import { OrderEmployeeService } from 'src/app/services/order-employee.service';
import { WeightService } from 'src/app/services/weight.service';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css'],
})
export class AddOrderComponent implements OnInit {
  id: number = 0;
  roleName: any;
  customer_Id: number = 0;
  customerPerc:number=0;
  myCustomer:any;
  orderForm!: FormGroup;
  branches: any;
  governs: any;
  cities: any;
  prodName: string = '';
  prodQuan: number = 0;
  prodWeight: number = 0;
  prodNameInput: any;
  prodQuantityInput: any;
  prodWeightInput: any;
  myProducts: any[] = [];
  cityId: number = 0;
  standardWeight: number = 0;
  extraWeightPrice: number = 0;
  villagePrice: number = 0;
  cityChargePrice: number = 0;
  totalProdsWeight: number = 0;
  totalPrice: number = 0;
  weightResult: any;
  clientVillage: string = '';
  totPiceInput: number = 0;
  totWeightInput: number = 0;
  editOrder: any;
  productsError:boolean=false;
  constructor(
    private orderCustomerService: OrderCustomerService,
    private branchService: BranchService,
    private governroateService: GovernroateService,
    private cityService: CityService,
    private formBuilder: FormBuilder,
    private weightService: WeightService,
    private activatedRoute: ActivatedRoute,
    private orderEmployeeService: OrderEmployeeService,
    private router: Router,
    private loginSerice: LoginService,
    private customerService:CustomerService
  ) {}

  ngOnInit(): void {
    this.customer_Id = Number(this.loginSerice.user.user_id);
    this.customerService.getCustomerById(Number(this.loginSerice.user.user_id)).subscribe(res=>this.myCustomer=res);
   
    this.roleName = this.loginSerice.user.user_roleName;
    this.orderForm = this.formBuilder.group({
      client_Name: [
        '',
        [Validators.required, Validators.pattern('^[a-zA-Z_ ]{5,25}')],
      ],
      client_Email: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-zA-Z0-9]{1,20}@[a-zA-Z]{1,7}.com'),
        ],
      ],
      client_Phone: [
        '',
        [Validators.required, Validators.pattern('^01[0125][0-9]{8}$')],
      ],
      branch_Id: [null, [Validators.required]],
      governorate_Id: [null, [Validators.required]],
      city_Id: [null, [Validators.required]],
      client_Village: ['', [Validators.pattern('^[a-zA-Z_ ]{3,25}')]],
      order_Type: ['', [Validators.required]],
      charge_Type: ['', [Validators.required]],
      payment_Type: ['', [Validators.required]],
      status: ['New'],
      total_Price: [null, [Validators.required]],
      total_Weight: [null, [Validators.required]],
      order_Date: [new Date()],
      products: [this.myProducts],
      customer_Id: [this.customer_Id],
    });

    this.branchService
      .getAvailableBranches()
      .subscribe((res) => (this.branches = res));
    this.weightService.getWeight().subscribe((res) => {
      this.weightResult = res;
    });

    this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    if (this.id !== 0) {
      this.orderEmployeeService.getOrderBydId(this.id).subscribe({
        next: (response) => {
          this.editOrder = response;
          this.orderForm.patchValue(this.editOrder);
          this.myProducts = this.editOrder.products;
          this.branchService.getAvailableBranches().subscribe(res=>{
            this.branches=res;
            this.governroateService.getGovernroateByBranchId(this.editOrder.branch_Id).subscribe(res=>{
              this.governs=res;})
              this.cityService.getCityByGovernroateId(this.editOrder.governorate_Id).subscribe(res=>this.cities=res);
            
          })
        },
      });

    }

    this.orderForm.get('total_Price')?.valueChanges.subscribe((value) => {
      this.totalPrice = value;
    });
    this.orderForm.get('total_Weight')?.valueChanges.subscribe((value) => {
      this.totalProdsWeight = value;
    });
  }
  getWeightResult() {
    this.standardWeight = this.weightResult.standard_Weight;
    this.extraWeightPrice = this.weightResult.extra_Weight_Price;
    this.villagePrice = this.weightResult.village_price;
  }

  getName(name: any) {
    this.prodName = name.value;
    this.prodNameInput = name;
  }

  getQuantity(quantity: any) {
    this.prodQuan = Number(quantity.value);
    this.prodQuantityInput = quantity;
  }

  getWeight(weight: any) {
    this.prodWeight = Number(weight.value);
    this.prodWeightInput = weight;
  }

  addProduct(e: Event) {
    e.preventDefault();
    if (this.prodName !== '' && this.prodQuan !== 0 && this.prodWeight !== 0) {
      this.myProducts.push({
        name: this.prodName,
        quantity: this.prodQuan,
        weight: this.prodWeight,
        order_Id: 0,
      });
      this.prodNameInput.value = '';
      this.prodQuantityInput.value = 0;
      this.prodWeightInput.value = 0;
      this.calculateWeight();
      this.calculatePrice();
    this.productsCheck();
    }
  }

  removeProduct(i: number) {
    this.myProducts = this.myProducts.filter(
      (item: any, index: any) => index !== i
    );
    this.calculateWeight();
    this.calculatePrice();
    this.productsCheck();

  }

  getGovern(branchId: any) {
    const id = Number(branchId);
    this.governroateService
      .getGovernroateByBranchId(id)
      .subscribe((res) => (this.governs = res));
  }

  getCity(governId: any) {
    const id = Number(governId);
    this.cityService
      .getCityByGovernroateId(id)
      .subscribe((res) => (this.cities = res));
  }

  getCityId(cityId: any) {
    this.cityId = Number(cityId);
  }

  getChargePrice(charge_type: string) {
    if (this.id != 0) {
      this.cityId=this.editOrder.city_Id;
    }
    this.cityService
      .getCityChargePrice(this.cityId, charge_type)
      .subscribe((res) => {
        this.cityChargePrice = Number(res);
        this.getWeightResult();
        if(this.myProducts.length !=0) {
          this.calculatePrice();
        }
      });
      this.customerPerc=this.myCustomer?.special_Discount_Perc;
  }

  getVillageData(village: string) {
    this.clientVillage = village;
    if (this.myProducts.length != 0) {
      this.calculatePrice();
    }
  }

  calculateWeight() {
    this.totalProdsWeight = this.myProducts.reduce(
      (totalWeight, product) => totalWeight + product.quantity * product.weight,
      0
    );
    this.totWeightInput = this.totalProdsWeight;
    this.orderForm.get('total_Weight')?.setValue(this.totalProdsWeight);
  }

  calculatePrice() {
    this.getWeightResult();
    this.calculateWeight();
    if (this.customerPerc != 0) {

      if (this.clientVillage !== '') {
        if (this.totalProdsWeight >= this.standardWeight) {
          this.totalPrice =
            (this.cityChargePrice * this.standardWeight +
            (this.totalProdsWeight - this.standardWeight) *
              this.extraWeightPrice +
            this.villagePrice)-(this.cityChargePrice * this.standardWeight +
              (this.totalProdsWeight - this.standardWeight) *
                this.extraWeightPrice +
              this.villagePrice)*(this.customerPerc/100);
          this.orderForm.get('total_Price')?.setValue(this.totalPrice);
        } else {
          this.totalPrice =
            (this.cityChargePrice * this.totalProdsWeight + this.villagePrice)-(this.cityChargePrice * this.totalProdsWeight + this.villagePrice)*(this.customerPerc/100);
          this.orderForm.get('total_Price')?.setValue(this.totalPrice);
        }
      } else {
        if (this.totalProdsWeight >= this.standardWeight) {
          this.totalPrice =
            (this.cityChargePrice * this.standardWeight +
            (this.totalProdsWeight - this.standardWeight) * this.extraWeightPrice)-(this.cityChargePrice * this.standardWeight +
              (this.totalProdsWeight - this.standardWeight) * this.extraWeightPrice)*(this.customerPerc/100);
          this.orderForm.get('total_Price')?.setValue(this.totalPrice);
        } else {
          (this.totalPrice = this.cityChargePrice * this.totalProdsWeight)-(this.totalPrice = this.cityChargePrice * this.totalProdsWeight)*(this.customerPerc/100);
          this.orderForm.get('total_Price')?.setValue(this.totalPrice);
        }
      }
    }
  }

  productsCheck(){
    if (this.myProducts.length ==0){
      this.productsError=true;
    } else{
      this.productsError=false;
    }
  }

  saveOrder(e: Event) {
    e.preventDefault();
    this.productsCheck();
    if (this.orderForm.valid && this.myProducts.length != 0) {
      if (this.id === 0)  {
        this.orderCustomerService
          .AddOrder(this.orderForm.value)
          .subscribe((res) => {
            this.router.navigate(['/customer/dashboard']);
            this.orderForm.reset();
            alert('Your Order Added Succsess');
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
          });
      } else {
        this.orderEmployeeService
          .editOrder(this.id, this.orderForm.value)
          .subscribe((res) => {
            this.router.navigate(['/employee/orders']);
            alert('The Order Updated Succsess');
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
          });
      }
    } else {
      this.markAllControlsAsTouched();
    }
  }
  markAllControlsAsTouched(): void {
    for (const controlName in this.orderForm.controls) {
      if (this.orderForm.controls.hasOwnProperty(controlName)) {
        this.orderForm.controls[controlName].markAsTouched();
      }
    }
  }
}
