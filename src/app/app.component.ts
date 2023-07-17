import { Component, OnInit } from '@angular/core';
import { LoginService } from './services/login.service';
import { AuthService } from './guards/auth.service';
// import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'FasTrans';
  constructor(private authService:AuthService) {}

  ngOnInit(): void {
    // if(localStorage.getItem("userName")) {
    //   this.authService.loggedIn=true;
    // }
  }
}
