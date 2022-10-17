import { Component, OnDestroy, OnInit } from "@angular/core";
import { DataStorageService } from "../../services/data-storage.service";
import { AuthService } from "../../services/auth.service";
import { Subscription } from "rxjs";
import { User, UserDetails } from "../../models/user.model";
import { EditUserDataDialogComponent } from '../../shared/components/edit-user-data-dialog/edit-user-data-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit, OnDestroy {
  private userSub: Subscription;
  private userDetailsSub: Subscription;
  public isAuthenticated: boolean;
  public userDetails: UserDetails;

  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthService,
    public dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    this.getUserData();
    this.getUserDetails();
    this.getUserDetailsFromStorage();
  }

  public getUserData(): void {
    this.userSub = this.authService.user
      .subscribe((userData: User) => {
        this.isAuthenticated = !!userData;
      });
  }

  public getUserDetails(): void {
    this.userDetailsSub = this.authService.userDetails
      .subscribe((userDetails: UserDetails) => {
        if (userDetails) {
          this.userDetails = {
            email: userDetails?.email,
            userName: userDetails.userName,
            gender: userDetails?.gender,
          }
          localStorage.setItem('userDetails', JSON.stringify(userDetails));
        }
      });
  }

  public getUserDetailsFromStorage(): void {
    this.userDetails = JSON.parse(localStorage.getItem('userDetails'));
  }

  public onLogout(): void {
    this.authService.logout();
  }

  public openEditUserDialog() {
    this.dialog.open(EditUserDataDialogComponent, {
      panelClass: ['animate__animated', 'animate__backInDown'],
      data: {
        userDetails: this.userDetails,
      },
    });
  }

  ngOnDestroy(): void {
    this.userSub?.unsubscribe();
    this.userDetailsSub?.unsubscribe();
  }
}
