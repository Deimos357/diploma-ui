import { Component, OnInit } from '@angular/core';
import { UserService } from '../_service/user.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { passwordMatchValidator } from '../_utils/equals-validator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  registerForm: FormGroup;
  passwordForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required]
    });

    this.passwordForm = this.formBuilder.group({
      oldPassword: ['', [Validators.required, Validators.minLength(6)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordAgain: ['', [Validators.required]]
    });

    this.userService.getCurrentUser().subscribe(u => {
      this.f.email.setValue(u.email);
      this.f.username.setValue(u.username);
    });
  }

  get f() { return this.registerForm.controls; }

  get ff() { return this.passwordForm.controls; }

  onEditSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;

    this.userService.edit(this.registerForm.value)
      .subscribe(
        data => {
          this.userService.getCurrentUser().subscribe(u => this.userService.update(u));
          this.router.navigate(['/welcome']);
        },
        error => {
          this.loading = false;
        });
  }

  delete() {
    this.loading = true;

    this.userService.delete()
      .subscribe(
        data => {
          this.router.navigate(['/login'], { queryParams: { from: 'delete' } });
        },
        error => {
          this.loading = false;
        });
  }
  
  onChangeSubmit() {
    this.submitted = true;

    if (this.passwordForm.invalid) {
      return;
    }

    this.loading = true;

    this.userService.changePassword(this.ff.oldPassword.value, this.ff.password.value)
      .subscribe(
        data => {
          this.router.navigate(['/welcome']);
        },
        error => {
          this.loading = false;
        });
  }
}
