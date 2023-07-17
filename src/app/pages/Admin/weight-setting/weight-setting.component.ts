import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { LoginService } from 'src/app/services/login.service';
import { WeightService } from 'src/app/services/weight.service';

@Component({
  selector: 'app-weight-setting',
  templateUrl: './weight-setting.component.html',
  styleUrls: ['./weight-setting.component.css'],
})
export class WeightSettingComponent implements OnInit {
  roleName: any;
  weightForm!: FormGroup;
  weight: any;
  constructor(
    private loginSerive: LoginService,
    private formBuilder: FormBuilder,
    private weightService: WeightService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.roleName = this.loginSerive.user.user_roleName;
    this.weightForm = this.formBuilder.group({
      standard_Weight: ['', [Validators.required, Validators.min(1)]],
      extra_Weight_Price: ['', [Validators.required, Validators.min(1)]],
      village_price: ['', [Validators.required, Validators.min(1)]],
    });

    this.weightService.getWeight().subscribe((res) => {
      this.weight = res;
      this.weightForm.controls['standard_Weight'].setValue(
        this.weight.standard_Weight
      );
      this.weightForm.controls['extra_Weight_Price'].setValue(
        this.weight.extra_Weight_Price
      );
      this.weightForm.controls['village_price'].setValue(
        this.weight.village_price
      );
    });
  }

  saveWeight(e: Event) {
    e.preventDefault();
    if (this.weightForm.valid) {
      this.weightService.editWeight(this.weightForm.value).subscribe();
      alert('Weight Setting Updated');
      this.router.navigate(['/admin/dashboard']);
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    } else {
      this.weightForm.markAllAsTouched();
    }
  }
}
