import { Component, Input, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css'],
})
export class OrderDetailsComponent implements OnInit {
  @Input() myOrder: any;
  roleName: any;
  constructor(private loginServie: LoginService) {}
  ngOnInit(): void {
    this.roleName = this.loginServie.user.user_roleName;
  }
}
