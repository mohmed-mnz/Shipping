import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn:boolean=false;
  

  login() {
    this.loggedIn = true;
  }

  logout(){
    this.loggedIn=false;
  }

  isAuth(){
    return this.loggedIn;
  }
 }
