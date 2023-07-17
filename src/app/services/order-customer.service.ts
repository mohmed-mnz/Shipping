import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OrderCustomerService {
  baseUrl: string = 'http://localhost:5143/api/OrderCustomer/';
  constructor(private http: HttpClient) {}

  getOrdersByCustomer(customer_Id: number) {
    return this.http.get(`${this.baseUrl}customer/${customer_Id}`);
  }

  getOrderByCustomerAndStatus(customer_Id: number, status: string) {
    return this.http.get(
      `${this.baseUrl}customerStatus/${customer_Id}/${status}`
    );
  }

  AddOrder(model: any) {
    return this.http.post(`${this.baseUrl}Add`, model);
  }
}
