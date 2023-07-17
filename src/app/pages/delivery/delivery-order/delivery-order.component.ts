import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { OrderDeliveryService } from 'src/app/services/order-delivery.service';

@Component({
  selector: 'app-delivery-order',
  templateUrl: './delivery-order.component.html',
  styleUrls: ['./delivery-order.component.css'],
})
export class DeliveryOrderComponent implements OnInit {
  roleName: any;
  delivery_Id: number = 0;
  orders: any;
  orderStatus: any;
  searchData: number = 0;
  searchInputField: any;
  p:number = 1
  itemsPerPage:number = 5;
  constructor(
    private loginService: LoginService,
    private orderDeliveryService: OrderDeliveryService
  ) {}

  ngOnInit(): void {
    this.roleName = this.loginService.user.user_roleName;
    this.delivery_Id = Number(this.loginService.user.user_id);
    this.getAll();
  }

  filterDate(status: any) {
    this.orderDeliveryService
      .getOrdersByDeliveryIdStatus(this.delivery_Id, status.innerText)
      .subscribe((res) => (this.orders = res));
  }
  getAll() {
    this.orderDeliveryService
      .getOrdersByDeliveryId(this.delivery_Id)
      .subscribe((res) => (this.orders = res));
  }

  updateStatus(id: number, status: string) {
    this.orderDeliveryService.getOrderById(id).subscribe((res) => {
      this.orderStatus = res;
      this.orderDeliveryService
        .updateOrderStatus(id, status, this.orderStatus)
        .subscribe(
          (updateRes) => {
            this.getAll();
            // Handle the response from the updateOrderStatus call if needed
            console.log('Order status updated successfully.', updateRes);
          },
          (error) => {
            console.error('Error updating order status:', error);
          }
        );
    });
  }

  searchInput(searchInput: any) {
    this.searchData = Number(searchInput.value);
    this.searchInputField = searchInput;
  }
  getSearch() {
    this.orderDeliveryService
      .getSearch(this.searchData, this.delivery_Id)
      .subscribe((res) => (this.orders = res));
  }
  resetSearch() {
    this.searchData = 0;
    this.searchInputField.value = '';
    this.getAll();
  }
}
