import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CityService } from 'src/app/services/city.service';
import { GovernroateService } from 'src/app/services/governroate.service';
import { LoginService } from 'src/app/services/login.service';
@Component({
  selector: 'app-cities-form',
  templateUrl: './cities-form.component.html',
  styleUrls: ['./cities-form.component.css'],
})
export class CitiesFormComponent implements OnInit {
  roleName: any;
  id: number = 0;
  city: any;
  result: any;
  GovernoratesList: any;
  cityForm!: FormGroup;
  NameFlag: boolean = false;

  constructor(
    private cityService: CityService,
    private governroateService: GovernroateService,
    private loginService: LoginService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.roleName = this.loginService.user.user_roleName;
    this.governroateService
      .getAvailableGovernroates()
      .subscribe((result: any) => {
        this.GovernoratesList = result;
      });

    this.getAllCities();

    this.cityForm = this.formBuilder.group({
      name: [
        '',
        [Validators.required, Validators.pattern('^[a-zA-Z_ ]{3,25}$')],
      ],
      charge_Regular: ['', [Validators.required, Validators.min(1)]],
      charge_24Hour: ['', [Validators.required, Validators.min(1)]],
      charge_15Days: ['', [Validators.required, Validators.min(1)]],
      charge_89Days: ['', [Validators.required, Validators.min(1)]],
      governorate_Id: ['', [Validators.required]],
      available: [],
    });

    this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    if (this.id != 0) {
      this.cityService.getCityById(this.id).subscribe({
        next: (response) => {
          this.city = response;
          this.cityForm.controls['name'].setValue(this.city.name);
          this.cityForm.controls['governorate_Id'].setValue(
            this.city.governorate_Id
          );
          this.cityForm.controls['charge_Regular'].setValue(
            this.city.charge_Regular
          );
          this.cityForm.controls['charge_24Hour'].setValue(
            this.city.charge_24Hour
          );
          this.cityForm.controls['charge_15Days'].setValue(
            this.city.charge_15Days
          );
          this.cityForm.controls['charge_89Days'].setValue(
            this.city.charge_89Days
          );
          this.cityForm.controls['available'].setValue(this.city.available);
        },
      });
    }
  }

  getAllCities() {
    this.cityService.getAllCities().subscribe((res) => (this.result = res));
  }

  submitForm(e: any) {
    e.preventDefault();
    if (this.cityForm.valid) {
      if (this.id == 0) {
        let Index = this.result.findIndex(
          (item: any) => item.name == this.cityForm.value.name
        );
        if (Index != -1) {
          this.NameFlag = true;
        } else {
          this.NameFlag = false;
          this.cityForm.controls['available'].setValue(true);
          this.cityService.addNewCity(this.cityForm.value).subscribe();
          alert('City Added Succsess');
          this.cityForm.reset();
          this.router.navigate(['/admin/Cities']);
          window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        }
      } else {
        this.cityService.editCity(this.id, this.cityForm.value).subscribe();
        alert('City Updated Succsess');
        this.router.navigate(['/admin/Cities']);
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      }
    } else {
      this.cityForm.markAllAsTouched();
    }
  }
}
