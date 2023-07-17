import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { OrderAdminService } from 'src/app/services/order-admin.service';
import { EmployeeService } from 'src/app/services/employee.service';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-orders-report',
  templateUrl: './orders-report.component.html',
  styleUrls: ['./orders-report.component.css'],
})
export class OrdersReportComponent implements OnInit {
  roleName: any;
  orders: any;
  statusInputField: any;
  startDateInputField: any;
  endDateInputField: any;
  statusSearch: string = '';
  startDateSearch: Date = new Date();
  endDateSearch: Date = new Date();
  p:number = 1
  itemsPerPage:number = 5;
  constructor(
    private orderAdminService: OrderAdminService,
    private loginService: LoginService
  ) {}
  ngOnInit(): void {
    this.roleName = this.loginService.user.user_roleName;
    this.getAllOrders();
  }

  getAllOrders() {
    this.orderAdminService
      .getAllOrders()
      .subscribe((res) => (this.orders = res));
  }

  getStatus(statusInp: any) {
    this.statusInputField = statusInp;
    this.statusSearch = statusInp.value;
  }
  getStartDate(startInp: any) {
    this.startDateInputField = startInp;
    this.startDateSearch = startInp.value;
  }

  getEndDate(endInp: any) {
    this.endDateInputField = endInp;
    this.endDateSearch = endInp.value;
  }

  getReport() {
    this.orderAdminService
      .getOrdersReport(
        this.statusSearch,
        this.startDateSearch,
        this.endDateSearch
      )
      .subscribe((res) => (this.orders = res));
  }

  resetSearch() {
    this.getAllOrders();
    this.endDateInputField.value = new Date();
    this.startDateInputField.value = new Date();
    this.statusInputField.value = '';
  }

  downloadPDF(): void {
    const doc = new jsPDF();
    const table = document.querySelector('table');

    if (table) {
      const columns = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

      const filteredTable = table.cloneNode(true) as HTMLTableElement;
      const tableRows = Array.from(filteredTable.querySelectorAll('tr'));

      for (const row of tableRows) {
        const cells = Array.from(row.querySelectorAll('th, td'));
        for (let i = cells.length - 1; i >= 0; i--) {
          if (!columns.includes(i)) {
            row.removeChild(cells[i]);
          }
        }
      }

      const options = {
        theme: 'grid',
        startX: 50,
        startY: 30,
      };

      (doc as any).autoTable({ html: filteredTable, ...options });

      doc.save('table.pdf');
    }
  }
}
