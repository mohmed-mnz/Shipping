import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OrderDeliveryService {
  baseUrl: string = 'http://localhost:5143/api/OrderDelivery/';
  constructor(private http: HttpClient) {}

  getOrdersByDeliveryId(id: number) {
    return this.http.get(`${this.baseUrl}delivery/${id}`);
  }

  getOrdersByDeliveryIdStatus(id: number, status: string) {
    return this.http.get(`${this.baseUrl}deliveryStatus/${id}/${status}`);
  }

  getSearch(id: number, delivery_Id: number) {
    return this.http.get(`${this.baseUrl}search/${id}/${delivery_Id}`);
  }
  getOrderById(id: number) {
    return this.http.get(`${this.baseUrl}Id/${id}`);
  }

  updateOrderStatus(id: number, status: string, model: any) {
    return this.http.put(`${this.baseUrl}status/${id}/${status}`, model);
  }
}
