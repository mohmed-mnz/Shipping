import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  baseURL: string = 'http://localhost:5143/api/Customers/';
  constructor(private http: HttpClient) {}

  getCustomerById(id: number) {
    return this.http.get(`${this.baseURL}Id/${id}`);
  }

  addCustomer(customer: any) {
    return this.http.post(`${this.baseURL}Add`, customer);
  }

  getAllCustomers() {
    return this.http.get(`${this.baseURL}All`);
  }

  editCustomer(id: number, customer: any) {
    return this.http.put(`${this.baseURL}edit/${id}`, customer);
  }

  getAllAvailableCustomerss() {
    return this.http.get(`${this.baseURL}Available`);
  }

  getCustomerByName(name: string) {
    return this.http.get(`${this.baseURL}Name/${name}`);
  }

  DeleteCustomer(id: number) {
    return this.http.delete(`${this.baseURL}delete/${id}`);
  }

  SoftDeleteCustomer(id: number, customer: any) {
    return this.http.put(`${this.baseURL}softdelete/${id}`, customer);
  }
}
