import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  baseUrl: string = 'http://localhost:5143/api/employees/';

  constructor(private http: HttpClient) {}

  getALlEmployees(): Observable<any> {
    return this.http.get(`${this.baseUrl}all`);
  }

  getAvailableEmployees(): Observable<any> {
    return this.http.get(`${this.baseUrl}Available`);
  }
  getEmployeeById(id: Number): Observable<any> {
    return this.http.get(`${this.baseUrl}Id/${id}`);
  }

  getEmployeesByName(name: string): Observable<any> {
    return this.http.get(`${this.baseUrl}Name/${name}`);
  }

  addEmployee(employee: any): Observable<any> {
    return this.http.post(`${this.baseUrl}Add`, employee);
  }

  editEmployee(id: Number, employee: any): Observable<any> {
    return this.http.put(`${this.baseUrl}edit/${id}`, employee);
  }

  softDeleteEmployee(id: Number, employee: any): Observable<any> {
    return this.http.put(`${this.baseUrl}softdelete/${id}`, employee);
  }

  DeleteEmployees(id: Number): Observable<any> {
    return this.http.delete(`${this.baseUrl}Delete/${id}`);
  }
}
