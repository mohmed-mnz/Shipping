import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OrderEmployeeService {
  baseUrl: string = 'http://localhost:5143/api/OrderEmployee/';
  constructor(private http: HttpClient) {}

  getOrdersByBranch(branch_Id: number) {
    return this.http.get(`${this.baseUrl}Branch/${branch_Id}`);
  }

  getOrderByBranchAndStatus(branch_Id: number, status: string) {
    return this.http.get(`${this.baseUrl}BranchStatus/${branch_Id}/${status}`);
  }

  editOrder(id: number, model: any) {
    return this.http.put(`${this.baseUrl}Edit/${id}`, model);
  }

  updateOrderStatus(id: number, status: string, model: any) {
    return this.http.put(`${this.baseUrl}status/${id}/${status}`, model);
  }

  getOrderBydId(id: number) {
    return this.http.get(`${this.baseUrl}Id/${id}`);
  }

  getSearch(id: number, branch_Id: number) {
    return this.http.get(`${this.baseUrl}search/${id}/${branch_Id}`);
  }
  updateOrderDelivery(id: number, delivery_Id: number, model: any) {
    return this.http.put(`${this.baseUrl}delivery/${id}/${delivery_Id}`, model);
  }

  AddOrder(model: any) {
    return this.http.post(`${this.baseUrl}Add`, model);
  }

  deleteOrder(id: number) {
    return this.http.delete(`${this.baseUrl}Delete/${id}`);
  }
}
