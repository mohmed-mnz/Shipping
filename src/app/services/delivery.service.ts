import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DeliveryService {
  baseUrl: string = 'http://localhost:5143/api/Deliveries/';

  constructor(private http: HttpClient) {}

  addDelivery(model: any) {
    return this.http.post(this.baseUrl + 'add', model);
  }
  getAllDelivieries(): Observable<any[]> {
    return this.http.get<any>(this.baseUrl + 'All');
  }

  getDelivieriesAvailable(): Observable<any[]> {
    return this.http.get<any>(this.baseUrl + 'Available');
  }

  getDelivieriesAvailableByBranch(branch_Id: number): Observable<any[]> {
    return this.http.get<any>(this.baseUrl + 'AvailableBranch/' + branch_Id);
  }

  sofDelete(id: number, model: any) {
    return this.http.put(this.baseUrl + 'softdelete/' + id, model);
  }

  updateDelivery(id: number, model: any) {
    return this.http.put(`${this.baseUrl}edit/${id}`, model);
  }

  GetDeliveryByID(id: number) {
    return this.http.get(this.baseUrl + 'Id/' + id);
  }

  GetDeliveryByName(name: string) {
    return this.http.get(this.baseUrl + 'Name/' + name);
  }

  DeleteDelivery(id: number) {
    return this.http.delete(this.baseUrl + 'delete/' + id);
  }
}
