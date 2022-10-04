import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User, UserDetails } from '../../../models/user.model';
import { AuthService } from '../../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-user-data-dialog',
  templateUrl: './edit-user-data-dialog.component.html',
  styleUrls: ['./edit-user-data-dialog.component.scss']
})
export class EditUserDataDialogComponent implements OnInit {
  public editForm: FormGroup;
  public hide: boolean = true;
  public isSubmitted: boolean;
  public allUsers: UserDetails[] = [];
  private userDetailsSub: Subscription;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public fb: FormBuilder,
    private authService: AuthService,
  ) {
  }

  ngOnInit(): void {
    this.initForm();
    this.getAllUsers();
  }

  private getAllUsers(): void {
    this.userDetailsSub = this.authService.getUserData().subscribe((userDetails: User) => {
      for (let key in userDetails) {
        if (this.data.userDetails.email !== userDetails[key].email) {
          this.allUsers.push(userDetails[key]);
        }
      }
    });
  }

  private initForm(): void {
    this.editForm = this.fb.group({
      email: [this.data.userDetails.email],
      userName: [this.data.userDetails.userName, Validators.required],
      gender: [this.data.userDetails.gender, Validators.required],
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
    this.authService.userDetails.next(this.editForm.value);
    this.allUsers.push(this.editForm.value);
    this.authService.putUsers(this.allUsers).subscribe();
  }

  ngOnDestroy(): void {
    this.userDetailsSub?.unsubscribe();
  }
}
