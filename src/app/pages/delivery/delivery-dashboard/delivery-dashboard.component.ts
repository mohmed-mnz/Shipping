import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderDeliveryService } from './../../../services/order-delivery.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-delivery-dashboard',
  templateUrl: './delivery-dashboard.component.html',
  styleUrls: ['./delivery-dashboard.component.css'],
})
export class DeliveryDashboardComponent implements OnInit {
  roleName: any;
  delivery_Id: number = 0;
  allOrders: any;
  deliveredOrders: any;
  cantReachOrders: any;
  postponedOrders: any;
  partialyDelvOrders: any;
  canceledOrders: any;
  rejectedWithPayOrders: any;
  rejectedWithPercPayOrders: any;
  rejectedWithouPayOrders: any;

  constructor(
    private router: Router,
    private orderDeliveryService: OrderDeliveryService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.delivery_Id = Number(this.loginService.user.user_id);
    this.roleName = this.loginService.user.user_roleName;
    this.orderDeliveryService
      .getOrdersByDeliveryId(this.delivery_Id)
      .subscribe((res) => (this.allOrders = res));
    this.orderDeliveryService
      .getOrdersByDeliveryIdStatus(this.delivery_Id, 'Deliverd')
      .subscribe((res) => (this.deliveredOrders = res));
    this.orderDeliveryService
      .getOrdersByDeliveryIdStatus(this.delivery_Id, 'Can’t Be Reached')
      .subscribe((res) => (this.cantReachOrders = res));
    this.orderDeliveryService
      .getOrdersByDeliveryIdStatus(this.delivery_Id, 'Postponed')
      .subscribe((res) => (this.postponedOrders = res));
    this.orderDeliveryService
      .getOrdersByDeliveryIdStatus(this.delivery_Id, 'Partially Delivered')
      .subscribe((res) => (this.partialyDelvOrders = res));
    this.orderDeliveryService
      .getOrdersByDeliveryIdStatus(this.delivery_Id, 'Client Canseled')
      .subscribe((res) => (this.canceledOrders = res));
    this.orderDeliveryService
      .getOrdersByDeliveryIdStatus(this.delivery_Id, 'Rejected With Payment')
      .subscribe((res) => (this.rejectedWithPayOrders = res));
    this.orderDeliveryService
      .getOrdersByDeliveryIdStatus(this.delivery_Id, 'Rejected With Percentage')
      .subscribe((res) => (this.rejectedWithPercPayOrders = res));
    this.orderDeliveryService
      .getOrdersByDeliveryIdStatus(this.delivery_Id, 'Client Canseled')
      .subscribe((res) => (this.canceledOrders = res));
    this.orderDeliveryService
      .getOrdersByDeliveryIdStatus(this.delivery_Id, 'Regected Without Payment')
      .subscribe((res) => (this.rejectedWithouPayOrders = res));
  }

  goAll() {
    const data = JSON.stringify(this.allOrders);
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
