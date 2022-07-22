import { Component, OnDestroy, OnInit } from "@angular/core";
import { DataStorageService } from "../../services/data-storage.service";
import { AuthService } from "../../services/auth.service";
import { Subscription } from "rxjs";
import { User } from "../../models/user.model";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit, OnDestroy {
  private userSub: Subscription;
  public isAuthenticated: boolean;

  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthService,
  ) {
  }

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe((userData: User) => {
      this.isAuthenticated = !!userData;
    });
  }

  ngOnDestroy(): void {
    this.userSub?.unsubscribe();
  }

  public onSaveData(): void {
    this.dataStorageService.storeRecipes();
  }

  public onFetchData(): void {
    this.dataStorageService.fetchRecipes().subscribe();
  }

  public onLogout(): void {
    this.authService.logout();
  }
}
