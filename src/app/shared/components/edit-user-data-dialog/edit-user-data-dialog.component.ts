import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-user-data-dialog',
  templateUrl: './edit-user-data-dialog.component.html',
  styleUrls: ['./edit-user-data-dialog.component.scss']
})
export class EditUserDataDialogComponent implements OnInit {
  public editForm: FormGroup;
  public hide: boolean = true;
  public isSubmitted: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public fb: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.editForm = this.fb.group({
      userName: ['', Validators.required],
      email: [{ value: this.data.userDetails.email, disabled: true }],
      password: ['', [Validators.required, Validators.minLength(8)]],
      gender: [''],
    })
  }

  get username(): AbstractControl {
    return this.editForm.controls.username;
  }

  get password(): AbstractControl {
    return this.editForm.controls.password;
  }

  get gender(): AbstractControl {
    return this.editForm.controls.gender;
  }

  public onSubmit(): void {

  }
}
