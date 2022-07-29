import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from './components/store/app.reducer';
import * as AuthActions from './components/auth/store/auth.actions';

interface ngOnInit {
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements ngOnInit {
  constructor(
    private store: Store<fromApp.AppState>,
  ) {
  }

  ngOnInit(): void {
    this.store.dispatch(new AuthActions.AutoLogin());
  }
}
