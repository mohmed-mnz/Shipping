import { Component } from '@angular/core';
import { CityService } from 'src/app/services/city.service';
import { LoginService } from 'src/app/services/login.service';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { GovernroateService } from 'src/app/services/governroate.service';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.css'],
})
export class CitiesComponent {
  cities: any;
  roleName: any;
  searchData: string = '';
  searchInputField: any;
  governList:any;
  p:number = 1
  itemsPerPage:number = 5;
  constructor(
    private cityService: CityService,
    private loginService: LoginService,
    private governroateService:GovernroateService
  ) {}

  ngOnInit(): void {
    this.roleName = this.loginService.user.user_roleName;
    this.governroateService.getAllGovernroates().subscribe(res=>this.governList=res);
    this.cityService.getAllCities().subscribe((res) => (this.cities = res));
  }

  softDelete(model: any) {
    console.log(model);
    let model_id = Number(model.id);
    console.log(model_id);
    this.cityService.softDeleteCity(model_id, model).subscribe();
  }
  searchInput(searchInput: any) {
    this.searchData = searchInput.value;
    this.searchInputField = searchInput;
  }

  getSearch() {
    this.cityService
      .getCityByName(this.searchData)
      .subscribe((res) => (this.cities = res));
  }
  resetSearch() {
    this.searchData = '';
    this.searchInputField.value = '';
    this.cityService.getAllCities().subscribe((res) => (this.cities = res));
  }

  getByGovern(governId:any){
    if (governId == "all") {
      this.cityService
      .getAllCities()
      .subscribe((res) => (this.cities = res));
    }else{
    const id = Number(governId);
    this.cityService
      .getCityByGovernroateId(id)
      .subscribe((res) => (this.cities = res));
    }
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
