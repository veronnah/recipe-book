import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataStorageService } from '../../services/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { map, Subscription } from 'rxjs';
import { User } from '../../models/user.model';
import { Store } from '@ngrx/store';
import * as fromApp from '../../components/store/app.reducer';
import * as AuthActions from '../auth/store/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit, OnDestroy {
  private userSub: Subscription;
  public isAuthenticated: boolean;
  public userEmail: string;

  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthService,
    private store: Store<fromApp.AppState>,
  ) {
  }

  ngOnInit(): void {
    this.userSub = this.store.select('auth')
      .pipe(map(authState => authState.user))
      .subscribe((userData: User) => {
        this.isAuthenticated = !!userData;
        this.userEmail = userData?.email;
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
    this.store.dispatch(new AuthActions.Logout());
  }
}
