import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { SignupResponse } from "../../models/signupResponse.model";

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

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
  ) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    })
  }

  public onSubmit(): void {
    if (this.authForm.invalid) {
      return;
    }
    this.isSubmitted = true;
    this.disableControls();

    if (this.isLoginMode) {

    } else {
      this.authService.signUp(this.authForm.value)
        .subscribe({
            next: (response: SignupResponse) => {
              this.isSubmitted = false;
              this.enableControls();
            },
            error: (errorMessage) => {
              this.error = errorMessage;
              this.isSubmitted = false;
              this.enableControls();
            },
          }
        )
    }
    this.authForm.reset();
  }

  private disableControls(): void {
    this.authForm.controls.email.disable();
    this.authForm.controls.password.disable();
  }

  private enableControls(): void {
    this.authForm.controls.email.enable();
    this.authForm.controls.password.enable();
  }

  public onSwitchMode(): void {
    this.isLoginMode = !this.isLoginMode;
  }

}
