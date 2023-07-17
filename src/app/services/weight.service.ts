import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WeightService {
  baseUrl: string = 'http://localhost:5143/api/Weights/';
  constructor(private http: HttpClient) {}

  getWeight() {
    return this.http.get(`${this.baseUrl}Get`);
  }

  editWeight(model: any) {
    return this.http.put(`${this.baseUrl}Edit`, model);
  }
}
