import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BranchService {
  baseUrl: string = 'http://localhost:5143/api/Branches/';
  constructor(private http: HttpClient) {}

  getAllBranches() {
    return this.http.get(`${this.baseUrl}All`);
  }

  getAvailableBranches() {
    return this.http.get(`${this.baseUrl}Available`);
  }

  getBranchById(id: number) {
    return this.http.get(`${this.baseUrl}Id/${id}`);
  }

  getBranchByName(name: string) {
    return this.http.get(`${this.baseUrl}Name/${name}`);
  }

  addNewBranch(model: any) {
    return this.http.post(`${this.baseUrl}Add`, model);
  }

  editBranch(id: number, model: any) {
    return this.http.put(`${this.baseUrl}Edit/${id}`, model);
  }

  softDeleteBranch(id: number, model: any) {
    return this.http.put(`${this.baseUrl}softdelete/${id}`, model);
  }
}
