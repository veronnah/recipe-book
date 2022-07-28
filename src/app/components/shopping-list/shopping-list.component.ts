import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from '../../models/ingredient.model';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from './store/shopping-list.actions';
import * as fromApp from '../store/app.reducer';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  public ingredients: Observable<{ ingredients: Ingredient[] }>;

  private igAddSubscription: Subscription;

  constructor(
    private store: Store<fromApp.AppState>,
  ) {
  }

  ngOnInit(): void {
    this.ingredients = this.store.select('shoppingList');
  }

  public onEditItem(index: number): void {
    this.store.dispatch(new ShoppingListActions.StartEdit(index));
  }

  ngOnDestroy(): void {
    this.igAddSubscription?.unsubscribe();
  }
}
