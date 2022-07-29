import { Component, OnInit } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
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
  private storeSub: Subscription;

  constructor(
    private fb: UntypedFormBuilder,
    private store: Store<fromApp.AppState>,
  ) {
  }

  ngOnInit(): void {
    this.initForm();
    this.storeSub = this.store.select('auth')
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
    this.disableControls();

    if (this.isLoginMode) {
      this.store.dispatch(new AuthActions.LoginStart(this.authForm.value));
    } else {
      this.store.dispatch(new AuthActions.SignupStart(this.authForm.value));
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

  ngOnDestroy(){
    this.storeSub?.unsubscribe();
  }
}
