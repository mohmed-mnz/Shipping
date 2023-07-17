import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployeeGuardsService implements CanActivate {

  constructor(private router:Router){}
  canActivate():boolean{
    if (localStorage.getItem("roleName") == "Employee") {
      return true;
    } else {
      this.router.navigate(['/notfound']);
      return false;
    }
  }
}
