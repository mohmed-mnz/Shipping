import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  baseUrl: string = 'http://localhost:5143/api/Admin/';
  constructor(private http: HttpClient) {}

  getAdmins() {
    return this.http.get(`${this.baseUrl}all`);
  }
}
