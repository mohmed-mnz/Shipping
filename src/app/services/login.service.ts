import {
  HttpClient,
  HttpEvent,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  baseUrlAll: string = 'http://localhost:5143/api/login';
  user = {
    user_id: localStorage.getItem('userId'),
    user_name: localStorage.getItem('userName'),
    user_roleName: localStorage.getItem('roleName'),
    user_roleId: localStorage.getItem('roleId'),
    branch_Id: localStorage.getItem('branchId'),
    user_token: localStorage.getItem('token'),
  };

  constructor(private _HttpClient: HttpClient) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    throw new Error('Method not implemented.');
  }
  getAllUsers(login: any) {
    return this._HttpClient.post(this.baseUrlAll, login);
  }
}
