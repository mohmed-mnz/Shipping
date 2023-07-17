import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BranchService } from 'src/app/services/branch.service';
import { GovernroateService } from 'src/app/services/governroate.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-governroates-form',
  templateUrl: './governroates-form.component.html',
  styleUrls: ['./governroates-form.component.css'],
})
export class GovernroatesFormComponent implements OnInit {
  GovernratesForm!: FormGroup;
  branchList: any;
  roleName: any;
  id: number = 0;
  governroate: any;
  result: any;
  NameFlag: boolean = false;

  constructor(
    private governroateService: GovernroateService,
    private branchService: BranchService,
    private loginService: LoginService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.roleName = this.loginService.user.user_roleName;
    this.branchService.getAvailableBranches().subscribe((result: any) => {
      this.branchList = result;
    });
    this.getAllGovernroates();

    this.GovernratesForm = this.formBuilder.group({
      name: [
        '',
        [Validators.required, Validators.pattern('^[a-zA-Z_ ]{3,25}$')],
      ],
      branch_Id: ['', [Validators.required]],
      available: [],
    });

    this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    if (this.id != 0) {
      this.governroateService.getGovernroateById(this.id).subscribe({
        next: (response) => {
          this.governroate = response;
          this.GovernratesForm.controls['name'].setValue(this.governroate.name);
          this.GovernratesForm.controls['branch_Id'].setValue(
            this.governroate.branch_Id
          );
          this.GovernratesForm.controls['available'].setValue(
            this.governroate.available
          );
        },
      });
    }
  }

  getAllGovernroates() {
    this.governroateService
      .getAllGovernroates()
      .subscribe((res) => (this.result = res));
  }

  submitForm(e: any) {
    e.preventDefault();
    if (this.GovernratesForm.valid) {
      if (this.id == 0) {
        let Index = this.result.findIndex(
          (item: any) => item.name == this.GovernratesForm.value.name
        );
        if (Index != -1) {
          this.NameFlag = true;
        } else {
          this.NameFlag = false;
          this.GovernratesForm.controls['available'].setValue(true);
          this.governroateService
            .addNewGovernroate(this.GovernratesForm.value)
            .subscribe();
          alert('Governroate Added Succsess');
          this.GovernratesForm.reset();
          this.router.navigate(['/admin/Governroates']);
          window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        }
      } else {
        this.governroateService
          .editGovernroate(this.id, this.GovernratesForm.value)
          .subscribe();
        alert('Governroate Updated Succsess');
        this.router.navigate(['/admin/Governroates']);
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      }
    } else {
      this.GovernratesForm.markAllAsTouched();
    }
  }
}
