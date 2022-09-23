import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { Observable } from "rxjs";
import { AuthResponse } from "../../models/authResponse.model";
import { Router } from "@angular/router";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  public isLoginMode: boolean = true;
  public authForm: FormGroup;
  public isSubmitted: boolean;
  public error: string;
  public hide: boolean = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      gender: [''],
    })
  }

  get email(): AbstractControl {
    return this.authForm.controls.email;
  }

  get password(): AbstractControl {
    return this.authForm.controls.password;
  }

  get gender(): AbstractControl {
    return this.authForm.controls.gender;
  }

  public onSubmit(): void {
    if (this.authForm.invalid) {
      return;
    }
    let authObserve: Observable<AuthResponse>;
    this.isSubmitted = true;
    this.disableControls();

    if (this.isLoginMode) {
      authObserve = this.authService.logIn(this.authForm.value);
    } else {
      authObserve = this.authService.signUp(this.authForm.value)
    }

    authObserve.subscribe({
        next: () => {
          this.isSubmitted = false;
          this.enableControls();
          this.router.navigate(['recipes']);
        },
        error: (errorMessage) => {
          this.error = errorMessage;
          this.isSubmitted = false;
          this.enableControls();
        },
      }
    )
    this.authForm.reset();
  }

  private disableControls(): void {
    this.authForm.controls.email.disable();
    this.authForm.controls.password.disable();
    this.authForm.controls.gender.disable();
  }

  private enableControls(): void {
    this.authForm.controls.email.enable();
    this.authForm.controls.password.enable();
    this.authForm.controls.gender.enable();
  }

  public onSwitchMode(): void {
    this.isLoginMode = !this.isLoginMode;
    if (this.isLoginMode) {
      this.authForm.controls.gender.clearValidators();
    } else {
      this.authForm.controls.gender.addValidators(Validators.required);
    }
    this.authForm.reset();
  }
}
