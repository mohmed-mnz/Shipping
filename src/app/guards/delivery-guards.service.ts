import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DeliveryGuardsService implements CanActivate {

  constructor(private router:Router){}
  canActivate():boolean{
    if (localStorage.getItem("roleName") == "Delivery") {
      return true;
    } else {
      this.router.navigate(['/notfound']);
      return false;
    }
  }
}
