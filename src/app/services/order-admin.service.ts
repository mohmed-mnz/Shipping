import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OrderAdminService {
  baseUrl: string = 'http://localhost:5143/api/OrderAdmin/';
  constructor(private http: HttpClient) {}

  getAllOrders() {
    return this.http.get(`${this.baseUrl}All`);
  }

  getOrdersByStatus(status: string) {
    return this.http.get(`${this.baseUrl}Status/${status}`);
  }

  getOrdersReport(status: string, startDate: Date, endDate: Date) {
    return this.http.get(
      `${this.baseUrl}Report/${status}/${startDate}/${endDate}`
    );
  }

  getOrderById(id: number) {
    return this.http.get(`${this.baseUrl}Id/${id}`);
  }
}
