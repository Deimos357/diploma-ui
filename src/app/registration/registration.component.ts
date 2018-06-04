import { Component, OnInit } from '@angular/core';
import { UserService } from '../_service/user.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { passwordMatchValidator } from '../_utils/equals-validator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registerForm: FormGroup;
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
        username: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(6)]],
        passwordAgain: ['', [Validators.required]]
    }, passwordMatchValidator);
  }

  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
        return;
    }

    this.loading = true;

    this.userService.registartion(this.registerForm.value)
            .subscribe(
                data => {
                    this.router.navigate(['/login', { from: 'registration' }]);
                },
                error => {
                    this.loading = false;
                });
  }
}
