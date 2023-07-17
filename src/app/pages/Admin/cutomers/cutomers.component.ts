import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';
import { LoginService } from 'src/app/services/login.service';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-cutomers',
  templateUrl: './cutomers.component.html',
  styleUrls: ['./cutomers.component.css'],
})
export class CutomersComponent implements OnInit {
  roleName: any;
  customers: any;
  searchData: string = '';
  searchInputField: any;
  p:number = 1
  itemsPerPage:number = 5;
  constructor(
    private customerService: CustomerService,
    private loginSerive: LoginService
  ) {}

  ngOnInit(): void {
    this.roleName = this.loginSerive.user.user_roleName;
    this.customerService
      .getAllCustomers()
      .subscribe((res) => (this.customers = res));
  }

  softDelete(model: any) {
    let model_id = Number(model.id);
    this.customerService.SoftDeleteCustomer(model_id, model).subscribe();
  }
  searchInput(searchInput: any) {
    this.searchData = searchInput.value;
    this.searchInputField = searchInput;
  }
  getSearch() {
    this.customerService
      .getCustomerByName(this.searchData)
      .subscribe((res) => (this.customers = res));
  }
  resetSearch() {
    this.searchData = '';
    this.searchInputField.value = '';
    this.customerService
      .getAllCustomers()
      .subscribe((res) => (this.customers = res));
  }

  downloadPDF(): void {
    const doc = new jsPDF();
    const table = document.querySelector('table');

    if (table) {
      const columns = [0, 1, 2, 3, 4, 5, 6, 7]; // Specify the indices of the columns you want to include

      const filteredTable = table.cloneNode(true) as HTMLTableElement;
      const tableRows = Array.from(filteredTable.querySelectorAll('tr'));

      // Filter out the columns that are not needed
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
