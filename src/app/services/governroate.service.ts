import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GovernroateService {
  baseUrl: string = 'http://localhost:5143/api/Governroates/';
  constructor(private http: HttpClient) {}

  getAllGovernroates() {
    return this.http.get(`${this.baseUrl}All`);
  }

  getAvailableGovernroates() {
    return this.http.get(`${this.baseUrl}Available`);
  }

  getGovernroateById(id: number) {
    return this.http.get(`${this.baseUrl}Id/${id}`);
  }

  getGovernroateByName(name: string) {
    return this.http.get(`${this.baseUrl}Name/${name}`);
  }

  getGovernroateByBranchId(branch_Id: number) {
    return this.http.get(`${this.baseUrl}branch/${branch_Id}`);
  }

  addNewGovernroate(model: any) {
    return this.http.post(`${this.baseUrl}Add`, model);
  }

  editGovernroate(id: number, model: any) {
    return this.http.put(`${this.baseUrl}Edit/${id}`, model);
  }

  softDeleteGovernroate(id: number, model: any) {
    return this.http.put(`${this.baseUrl}softdelete/${id}`, model);
  }
}
