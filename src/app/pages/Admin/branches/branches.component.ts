import { Component } from '@angular/core';
import { BranchService } from 'src/app/services/branch.service';
import { LoginService } from 'src/app/services/login.service';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
@Component({
  selector: 'app-branches',
  templateUrl: './branches.component.html',
  styleUrls: ['./branches.component.css'],
})
export class BranchesComponent {
  branches: any;
  roleName: any;
  searchData: string = '';
  searchInputField: any;
  p:number = 1
  itemsPerPage:number = 5;
  constructor(
    private branchService: BranchService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.roleName = this.loginService.user.user_roleName;
    this.branchService
      .getAllBranches()
      .subscribe((res) => (this.branches = res));
  }

  softDelete(model: any) {
    console.log(model);
    let model_id = Number(model.id);
    console.log(model_id);
    this.branchService.softDeleteBranch(model_id, model).subscribe();
  }
  searchInput(searchInput: any) {
    this.searchData = searchInput.value;
    this.searchInputField = searchInput;
  }
  getSearch() {
    this.branchService
      .getBranchByName(this.searchData)
      .subscribe((res) => (this.branches = res));
  }
  resetSearch() {
    this.searchData = '';
    this.searchInputField.value = '';
    this.branchService
      .getAllBranches()
      .subscribe((res) => (this.branches = res));
  }
  downloadPDF(): void {
    const doc = new jsPDF();
    const table = document.querySelector('table');

    if (table) {
      const columns = [0, 1]; // Specify the indices of the columns you want to include

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
