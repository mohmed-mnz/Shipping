import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
// import { EmployeeService } from 'src/app/employee.service';
import { LoginService } from './../../services/login.service';
import { AuthService } from 'src/app/guards/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  registerForm!: FormGroup;
  name: string = '';
  login: boolean = false;
  message:any;

  constructor(
    private _FormBuilder: FormBuilder,
    private _loginService: LoginService,
    private _Router: Router,
    private authService:AuthService
  ) {}

  ngOnInit(): void {
    this.registerForm = this._FormBuilder.group({
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    });
  }

  get getEmail() {
    return this.registerForm.controls['email'];
  }

  get getPassword() {
    return this.registerForm.controls['password'];
  }

  Login(event: Event) {
    event.preventDefault();
    if (this.registerForm.valid) {
      this._loginService.getAllUsers(this.registerForm.value).subscribe(
        (result: any) => {
          this.message = result.mess
          if(!result.mess){
          localStorage.setItem('userName', result.name);
          localStorage.setItem('roleName', result.role_Name);
          localStorage.setItem('branchId', result.branch_Id);
          localStorage.setItem('roleId', result.role_Id);
          localStorage.setItem('roleId', result.role_Id);
          localStorage.setItem('userId', result.id);
          localStorage.setItem('token', result.token);
            this.authService.loggedIn=true;
          this._loginService.user = {
            user_id: localStorage.getItem('userId'),
            user_name: localStorage.getItem('userName'),
            user_roleName: localStorage.getItem('roleName'),
            user_roleId: localStorage.getItem('roleId'),
            branch_Id: localStorage.getItem('branchId'),
            user_token: localStorage.getItem('token'),
          };
          alert("Logged In Sucsess, Welcome Back");
          this._Router.navigate(['']);
          window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
          return result.token;
        }
        },

      );
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}
