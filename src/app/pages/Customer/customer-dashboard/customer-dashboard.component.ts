import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Route, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { OrderCustomerService } from 'src/app/services/order-customer.service';

@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.css'],
})
export class CustomerDashboardComponent implements OnInit {
  customer_Id: number = 0;
  roleName: any;
  allOrders: any;
  newOrders: any;
  waitingOrders: any;
  assignedOrders: any;
  deliveredOrders: any;
  cantReachOrders: any;
  postponedOrders: any;
  partialyDelvOrders: any;
  canceledOrders: any;
  rejectedWithPayOrders: any;
  rejectedWithPercPayOrders: any;
  rejectedWithouPayOrders: any;
  constructor(
    private orderCustomerService: OrderCustomerService,
    private router: Router,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.customer_Id = Number(this.loginService.user.user_id);
    this.roleName = this.loginService.user.user_roleName;
    this.orderCustomerService
      .getOrdersByCustomer(this.customer_Id)
      .subscribe((res) => (this.allOrders = res));
    this.orderCustomerService
      .getOrderByCustomerAndStatus(this.customer_Id, 'New')
      .subscribe((res) => (this.newOrders = res));
    this.orderCustomerService
      .getOrderByCustomerAndStatus(this.customer_Id, 'Waiting')
      .subscribe((res) => (this.waitingOrders = res));
    this.orderCustomerService
      .getOrderByCustomerAndStatus(this.customer_Id, 'Assigned To Delivery')
      .subscribe((res) => (this.assignedOrders = res));
    this.orderCustomerService
      .getOrderByCustomerAndStatus(this.customer_Id, 'Deliverd')
      .subscribe((res) => (this.deliveredOrders = res));
    this.orderCustomerService
      .getOrderByCustomerAndStatus(this.customer_Id, 'Can’t Be Reached')
      .subscribe((res) => (this.cantReachOrders = res));
    this.orderCustomerService
      .getOrderByCustomerAndStatus(this.customer_Id, 'Postponed')
      .subscribe((res) => (this.postponedOrders = res));
    this.orderCustomerService
      .getOrderByCustomerAndStatus(this.customer_Id, 'Partially Delivered')
      .subscribe((res) => (this.partialyDelvOrders = res));
    this.orderCustomerService
      .getOrderByCustomerAndStatus(this.customer_Id, 'Client Canseled')
      .subscribe((res) => (this.canceledOrders = res));
    this.orderCustomerService
      .getOrderByCustomerAndStatus(this.customer_Id, 'Rejected With Payment')
      .subscribe((res) => (this.rejectedWithPayOrders = res));
    this.orderCustomerService
      .getOrderByCustomerAndStatus(this.customer_Id, 'Rejected With Percentage')
      .subscribe((res) => (this.rejectedWithPercPayOrders = res));
    this.orderCustomerService
      .getOrderByCustomerAndStatus(this.customer_Id, 'Client Canseled')
      .subscribe((res) => (this.canceledOrders = res));
    this.orderCustomerService
      .getOrderByCustomerAndStatus(this.customer_Id, 'Regected Without Payment')
      .subscribe((res) => (this.rejectedWithouPayOrders = res));
  }

  goAll() {
    const data = JSON.stringify(this.allOrders);
    this.router.navigate(['/orders', data]);
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }
  goNew() {
    const data = JSON.stringify(this.newOrders);
    this.router.navigate(['/orders', data]);
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }
  goWaiting() {
    const data = JSON.stringify(this.waitingOrders);
    this.router.navigate(['/orders', data]);
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }
  goAssigned() {
    const data = JSON.stringify(this.assignedOrders);
    this.router.navigate(['/orders', data]);
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }
  goDelivered() {
    const data = JSON.stringify(this.deliveredOrders);
    this.router.navigate(['/orders', data]);
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }
  goCantReach() {
    const data = JSON.stringify(this.cantReachOrders);
    this.router.navigate(['/orders', data]);
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }
  goPostponed() {
    const data = JSON.stringify(this.postponedOrders);
    this.router.navigate(['/orders', data]);
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }
  goPartialyDelv() {
    const data = JSON.stringify(this.partialyDelvOrders);
    this.router.navigate(['/orders', data]);
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }
  goCanceled() {
    const data = JSON.stringify(this.canceledOrders);
    this.router.navigate(['/orders', data]);
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }
  goRejWithPay() {
    const data = JSON.stringify(this.rejectedWithPayOrders);
    this.router.navigate(['/orders', data]);
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }
  goRejWithPercPay() {
    const data = JSON.stringify(this.rejectedWithPercPayOrders);
    this.router.navigate(['/orders', data]);
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }
  goRejWithoutPay() {
    const data = JSON.stringify(this.rejectedWithouPayOrders);
    this.router.navigate(['/orders', data]);
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }
}
