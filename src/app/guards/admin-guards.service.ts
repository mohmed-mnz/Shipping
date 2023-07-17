import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { NotFoundComponent } from '../pages/not-found/not-found.component';

@Injectable({
  providedIn: 'root'
})

export class AdminGuardsService implements CanActivate {
  constructor(private router:Router){}
  canActivate():boolean{
    if (localStorage.getItem("roleName") == "Admin") {
      return true;
    } else {
      this.router.navigate(['/notfound']);
      return false;
    }
  }
}
