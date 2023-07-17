import {
  HttpClient,
  HttpEvent,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable, OnInit } from '@angular/core';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root',
})
export class CityService {
  baseUrl: string = 'http://localhost:5143/api/Cities/';
  // token:any;
  // headers:any;
  constructor(private http: HttpClient) {}

  getAllCities() {
    return this.http.get(`${this.baseUrl}All`);
  }

  getAvailableCities() {
    return this.http.get(`${this.baseUrl}Available`);
  }

  getCityById(id: number) {
    return this.http.get(`${this.baseUrl}Id/${id}`);
  }

  getCityByName(name: string) {
    return this.http.get(`${this.baseUrl}Name/${name}`);
  }

  getCityByGovernroateId(goverroate_Id: number) {
    return this.http.get(`${this.baseUrl}Governroate/${goverroate_Id}`);
  }

  getCityChargePrice(id: number, charge_Type: string) {
    return this.http.get(`${this.baseUrl}chargePrice/${id}/${charge_Type}`);
  }

  addNewCity(model: any) {
    return this.http.post(`${this.baseUrl}Add`, model);
  }

  editCity(id: number, model: any) {
    return this.http.put(`${this.baseUrl}Edit/${id}`, model);
  }

  softDeleteCity(id: number, model: any) {
    return this.http.put(`${this.baseUrl}softdelete/${id}`, model);
  }
}
