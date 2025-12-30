import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { AuthServices } from '../services/auth.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  // Injection
  private readonly _AuthServices = inject(AuthServices);
  private readonly _Router = inject(Router);
  private readonly _cd = inject(ChangeDetectorRef);

  // Properties
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),
    ]),
    password: new FormControl('', [Validators.required, Validators.pattern(/^.{3,}$/)]),
  });

  isError: boolean = false;

  // Methods
  login() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      this._AuthServices.login(email, password).subscribe((success) => {
        if (success) {
          this._Router.navigate(['/products']);
        } else {
          this.isError = true;
        }
      });
    } else {
      this.isError = true;
    }
  }
}
