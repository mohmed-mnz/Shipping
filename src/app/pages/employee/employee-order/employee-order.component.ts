import { Component, OnInit } from '@angular/core';
import { DeliveryService } from 'src/app/services/delivery.service';
import { OrderEmployeeService } from 'src/app/services/order-employee.service';
import { CommonModule } from '@angular/common';
import { LoginService } from 'src/app/services/login.service';
@Component({
  selector: 'app-employee-order',
  templateUrl: './employee-order.component.html',
  styleUrls: ['./employee-order.component.css'],
})
export class EmployeeOrderComponent implements OnInit {
  orders: any;
  searchData: number = 0;
  searchInputField: any;
  branch_Id: number = 0;
  roleName: any;
  filterBtns: any[] = [];
  orderStatus: any;
  deliveryList: any;
  orderDelivery: any;
  p:number = 1
  itemsPerPage:number = 5;
  constructor(
    private orderEmployeeService: OrderEmployeeService,
    private deliveryService: DeliveryService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.branch_Id = Number(this.loginService.user.branch_Id);
    this.roleName = this.loginService.user.user_roleName;
    this.getOrdersData();
  }

  getOrdersData() {
    this.orderEmployeeService
      .getOrdersByBranch(this.branch_Id)
      .subscribe((res) => (this.orders = res));

    this.deliveryService
      .getDelivieriesAvailableByBranch(this.branch_Id)
      .subscribe((res) => (this.deliveryList = res));
  }
  filterDate(status: any) {
    this.orderEmployeeService
      .getOrderByBranchAndStatus(this.branch_Id, status.innerText)
      .subscribe((res) => (this.orders = res));
  }
  getAll() {
    this.getOrdersData();
  }
  updateStatus(id: number, status: string) {
    this.orderEmployeeService.getOrderBydId(id).subscribe((res) => {
      this.orderStatus = res;
      this.orderEmployeeService
        .updateOrderStatus(id, status, this.orderStatus)
        .subscribe(
          (updateRes) => {
            this.getOrdersData();
            // Handle the response from the updateOrderStatus call if needed
            console.log('Order status updated successfully.', updateRes);
          },
          (error) => {
            // Handle any errors that occurred during the updateOrderStatus call
            console.error('Error updating order status:', error);
          }
        );
    });
  }
  updateDelivery(id: number, deliveryId: any) {
    let delivery_Id = Number(deliveryId);
    this.orderEmployeeService.getOrderBydId(id).subscribe((res) => {
      this.orderDelivery = res;
      this.orderEmployeeService
        .updateOrderDelivery(id, delivery_Id, this.orderDelivery)
        .subscribe(
          (updateDelv) => {
            this.getOrdersData();
            console.log('order delivery updated', updateDelv);
          },
          (error) => {
            console.log('error occured', error);
          }
        );
    });
  }
  deleteOrder(id: number) {
    console.log(id);
    if (confirm('Are You Sure You Want To Delete order No. ' + id)) {
      this.orderEmployeeService.deleteOrder(id).subscribe((res) => {
        this.getOrdersData();
      });
    }
  }
  searchInput(searchInput: any) {
    this.searchData = Number(searchInput.value);
    this.searchInputField = searchInput;
  }
  getSearch() {
    this.orderEmployeeService
      .getSearch(this.searchData, this.branch_Id)
      .subscribe((res) => (this.orders = res));
  }
  resetSearch() {
    this.searchData = 0;
    this.searchInputField.value = '';
    this.getOrdersData();
  }
}
