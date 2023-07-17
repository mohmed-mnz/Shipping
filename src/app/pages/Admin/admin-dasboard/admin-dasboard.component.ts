import { Component, OnInit } from '@angular/core';
import { OrderAdminService } from './../../../services/order-admin.service';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-admin-dasboard',
  templateUrl: './admin-dasboard.component.html',
  styleUrls: ['./admin-dasboard.component.css'],
})
export class AdminDasboardComponent implements OnInit {
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
    private orderAdminService: OrderAdminService,
    private router: Router,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.roleName = this.loginService.user.user_roleName;
    this.orderAdminService
      .getAllOrders()
      .subscribe((res) => (this.allOrders = res));
    this.orderAdminService
      .getOrdersByStatus('New')
      .subscribe((res) => (this.newOrders = res));
    this.orderAdminService
      .getOrdersByStatus('Waiting')
      .subscribe((res) => (this.waitingOrders = res));
    this.orderAdminService
      .getOrdersByStatus('Assigned To Delivery')
      .subscribe((res) => (this.assignedOrders = res));
    this.orderAdminService
      .getOrdersByStatus('Deliverd')
      .subscribe((res) => (this.deliveredOrders = res));
    this.orderAdminService
      .getOrdersByStatus('Can’t Be Reached')
      .subscribe((res) => (this.cantReachOrders = res));
    this.orderAdminService
      .getOrdersByStatus('Postponed')
      .subscribe((res) => (this.postponedOrders = res));
    this.orderAdminService
      .getOrdersByStatus('Partially Delivered')
      .subscribe((res) => (this.partialyDelvOrders = res));
    this.orderAdminService
      .getOrdersByStatus('Client Canseled')
      .subscribe((res) => (this.canceledOrders = res));
    this.orderAdminService
      .getOrdersByStatus('Rejected With Payment')
      .subscribe((res) => (this.rejectedWithPayOrders = res));
    this.orderAdminService
      .getOrdersByStatus('Rejected With Percentage')
      .subscribe((res) => (this.rejectedWithPercPayOrders = res));
    this.orderAdminService
      .getOrdersByStatus('Client Canseled')
      .subscribe((res) => (this.canceledOrders = res));
    this.orderAdminService
      .getOrdersByStatus('Regected Without Payment')
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
