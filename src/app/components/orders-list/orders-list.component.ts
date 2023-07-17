import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css'],
})
export class OrdersListComponent implements OnInit {
  dataList: any;
  roleName: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private loginSerice: LoginService
  ) {}

  ngOnInit(): void {
    this.roleName = this.loginSerice.user.user_roleName;
    this.activatedRoute.params.subscribe((params) => {
      const data = JSON.parse(params['data']);
      this.dataList = data;
    });
  }
}
