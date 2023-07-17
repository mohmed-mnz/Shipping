import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BranchService } from 'src/app/services/branch.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-branches-form',
  templateUrl: './branches-form.component.html',
  styleUrls: ['./branches-form.component.css'],
})
export class BranchesFormComponent implements OnInit {
  BranchForm!: FormGroup;
  roleName: any;
  id: number = 0;
  branch: any;
  result: any;
  NameFlag: boolean = false;
  constructor(
    private branchService: BranchService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.roleName = this.loginService.user.user_roleName;
    this.getAllBranches();

    this.BranchForm = this.formBuilder.group({
      name: [
        '',
        [Validators.required, Validators.pattern('^[a-zA-Z0-9_ ]{3,25}$')],
      ],
      available: [],
    });

    this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    if (this.id != 0) {
      this.branchService.getBranchById(this.id).subscribe({
        next: (response) => {
          this.branch = response;
          this.BranchForm.controls['name'].setValue(this.branch.name);
          this.BranchForm.controls['available'].setValue(this.branch.available);
        },
      });
    }
  }
  getAllBranches() {
    this.branchService.getAllBranches().subscribe((res) => (this.result = res));
  }
  submit(e: any) {
    e.preventDefault();
    if (this.BranchForm.valid) {
      if (this.id == 0) {
        let Index = this.result.findIndex(
          (item: any) => item.name == this.BranchForm.value.name
        );
        let NameIndex = this.result.findIndex(
          (item: any) => item.name == this.BranchForm.value.name
        );

        if (Index != -1) {
          if (NameIndex != -1) {
            this.NameFlag = true;
          } else {
            this.NameFlag = false;
          }
        } else {
          this.BranchForm.controls['available'].setValue(true);
          this.branchService.addNewBranch(this.BranchForm.value).subscribe();
          alert('Branch Added Succsess');
          this.BranchForm.reset();
          this.router.navigate(['/admin/Branches']);
          window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        }
      } else {
        this.branchService
          .editBranch(this.id, this.BranchForm.value)
          .subscribe();
        alert('Branch Updated Succsess');
        this.router.navigate(['/admin/Branches']);
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      }
    } else {
      this.BranchForm.markAllAsTouched();
    }
  }
}
