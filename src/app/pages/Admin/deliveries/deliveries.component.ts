import { Component, OnInit } from '@angular/core';
import { DeliveryService } from 'src/app/services/delivery.service';
import { LoginService } from 'src/app/services/login.service';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-deliveries',
  templateUrl: './deliveries.component.html',
  styleUrls: ['./deliveries.component.css'],
})
export class DeliveriesComponent implements OnInit {
  deliveries: any;
  roleName: any;
  searchData: string = '';
  searchInputField: any;
  p:number = 1
  itemsPerPage:number = 5;
  
  constructor(
    private delvieryService: DeliveryService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.roleName = this.loginService.user.user_roleName;
    this.delvieryService
      .getAllDelivieries()
      .subscribe((res) => (this.deliveries = res));
  }

  softDelete(model: any) {
    let model_id = Number(model.id);
    this.delvieryService.sofDelete(model_id, model).subscribe();
  }
  searchInput(searchInput: any) {
    this.searchData = searchInput.value;
    this.searchInputField = searchInput;
  }
  getSearch() {
    this.delvieryService
      .GetDeliveryByName(this.searchData)
      .subscribe((res) => (this.deliveries = res));
  }
  resetSearch() {
    this.searchData = '';
    this.searchInputField.value = '';
    this.delvieryService
      .getAllDelivieries()
      .subscribe((res) => (this.deliveries = res));
  }
  downloadPDF(): void {
    const doc = new jsPDF();
    const table = document.querySelector('table');

    if (table) {
      const columns = [0, 1, 2, 3, 4, 5]; // Specify the indices of the columns you want to include

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
