import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerGudarsService implements CanActivate {

  constructor(private router:Router){}
  canActivate():boolean{
    if (localStorage.getItem("roleName") == "Customer") {
      return true;
    } else {
      this.router.navigate(['/notfound']);
      return false;
    }
  }
}
