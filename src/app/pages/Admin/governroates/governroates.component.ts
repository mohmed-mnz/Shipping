import { Component, OnInit } from '@angular/core';
import { BranchService } from 'src/app/services/branch.service';
import { GovernroateService } from 'src/app/services/governroate.service';
import { LoginService } from 'src/app/services/login.service';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-governroates',
  templateUrl: './governroates.component.html',
  styleUrls: ['./governroates.component.css'],
})
export class GovernroatesComponent implements OnInit {
  governroates: any;
  branchList:any;
  roleName: any;
  searchData: string = '';
  searchInputField: any;
  p:number = 1
  itemsPerPage:number = 5;
  constructor(
    private governroateService: GovernroateService,
    private loginService: LoginService,private branchService:BranchService
  ) {}

  ngOnInit(): void {
    this.roleName = this.loginService.user.user_roleName;
    this.branchService.getAllBranches().subscribe(res=>this.branchList=res);
    this.governroateService
      .getAllGovernroates()
      .subscribe((res) => (this.governroates = res));
  }

  softDelete(model: any) {
    console.log(model);
    let model_id = Number(model.id);
    console.log(model_id);
    this.governroateService.softDeleteGovernroate(model_id, model).subscribe();
  }
  searchInput(searchInput: any) {
    this.searchData = searchInput.value;
    this.searchInputField = searchInput;
  }

  getSearch() {
    this.governroateService
      .getGovernroateByName(this.searchData)
      .subscribe((res) => (this.governroates = res));
  }
  resetSearch() {
    this.searchData = '';
    this.searchInputField.value = '';
    this.governroateService
      .getAllGovernroates()
      .subscribe((res) => (this.governroates = res));
  }

  getByBranch(branchId:any){
    if (branchId == "all") {
      this.governroateService
      .getAllGovernroates()
      .subscribe((res) => (this.governroates = res));
    }else{
    const id = Number(branchId);
    this.governroateService
      .getGovernroateByBranchId(id)
      .subscribe((res) => (this.governroates = res));
    }
  }
  downloadPDF(): void {
    const doc = new jsPDF();
    const table = document.querySelector('table');

    if (table) {
      const columns = [0, 1, 2]; // Specify the indices of the columns you want to include

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
