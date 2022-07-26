import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from "../../models/ingredient.model";
import { ShoppingListService } from "../../services/shopping-list.service";
import { Observable, Subscription } from "rxjs";
import { Store } from "@ngrx/store";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  public ingredients: Observable<{ ingredients: Ingredient[] }>;

  private igAddSubscription: Subscription;

  constructor(
    private shoppingListService: ShoppingListService,
    private store: Store<{ shoppingList: { ingredients: Ingredient[] } }>,
  ) {
  }

  ngOnInit(): void {
    this.ingredients = this.store.select('shoppingList');
    // this.ingredients = this.shoppingListService.getIngredients();
    // this.onIngredientAdded();
  }

  public onIngredientAdded(): void {
    // this.igAddSubscription = this.shoppingListService.ingredientAdded
    //   .subscribe((ingredients: Ingredient[]) => {
    //     this.ingredients = ingredients;
    //   });
  }

  public onEditItem(index: number): void {
    this.shoppingListService.editingItemIdx.next(index);
  }

  ngOnDestroy(): void {
    this.igAddSubscription?.unsubscribe();
  }
}
