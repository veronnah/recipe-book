import { Component, OnInit } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';
import { AuthResponse } from '../../models/authResponse.model';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from '../../components/store/app.reducer';
import * as AuthActions from './store/auth.actions';

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
    private fb: UntypedFormBuilder,
    private authService: AuthService,
    private router: Router,
    private store: Store<fromApp.AppState>,
  ) {
  }

  ngOnInit(): void {
    this.initForm();
    this.store.select('auth')
      .subscribe(authState => {
        this.isSubmitted = authState.loading;
        this.error = authState.authError;
        this.enableControls();
      });
  }

  private initForm(): void {
    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    })
  }

  public onSubmit(): void {
    if (this.authForm.invalid) {
      return;
    }
    let authObserve: Observable<AuthResponse>;
    this.isSubmitted = true;
    this.disableControls();

    if (this.isLoginMode) {
      // authObserve = this.authService.logIn(this.authForm.value);
      this.store.dispatch(new AuthActions.LoginStart(this.authForm.value));
    } else {
      authObserve = this.authService.signUp(this.authForm.value)
    }

    //
    // authObserve.subscribe({
    //     next: () => {
    //       this.isSubmitted = false;
    //       this.enableControls();
    //       this.router.navigate(['recipes']);
    //     },
    //     error: (errorMessage) => {
    //       this.error = errorMessage;
    //       this.isSubmitted = false;
    //       this.enableControls();
    //     },
    //   }
    // )
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
