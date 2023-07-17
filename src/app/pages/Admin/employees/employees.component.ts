import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
})
export class EmployeesComponent implements OnInit {
  employees: any;
  searchData: string = '';
  searchInputField: any;
  roleName: any;
  p:number = 1
  itemsPerPage:number = 5;
  constructor(
    private employeeService: EmployeeService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.roleName = this.loginService.user.user_roleName;
    this.employeeService
      .getALlEmployees()
      .subscribe((res) => (this.employees = res));
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

  softDelete(model: any) {
    let model_id = Number(model.id);
    this.employeeService.softDeleteEmployee(model_id, model).subscribe();
  }
  searchInput(searchInput: any) {
    this.searchData = searchInput.value;
    this.searchInputField = searchInput;
  }
  getSearch() {
    this.employeeService
      .getEmployeesByName(this.searchData)
      .subscribe((res) => (this.employees = res));
  }
  resetSearch() {
    this.searchData = '';
    this.searchInputField.value = '';
    this.employeeService
      .getALlEmployees()
      .subscribe((res) => (this.employees = res));
  }
}
