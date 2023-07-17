import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/guards/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit, OnChanges {
  userName: any;

  roleName: any;
  constructor(private loginService: LoginService, private router: Router,private authService:AuthService) {}
  ngOnChanges(changes: SimpleChanges): void {
    throw new Error('Method not implemented.');
  }
  ngOnInit(): void {
    this.userName = this.loginService.user.user_name;
    this.roleName = this.loginService.user.user_roleName;
  }

  logout(e: Event) {
    e.preventDefault();
alert("Loged Out Sucsess")
    localStorage.clear();
    this.router.navigate(['']);
  }
}
