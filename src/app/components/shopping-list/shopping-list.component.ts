import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from "../../models/ingredient.model";
import { ShoppingListService } from "../../services/shopping-list.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  public ingredients: Ingredient[];

  private igAddSubscription: Subscription;

  constructor(private shoppingListService: ShoppingListService) {
  }

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();
    this.onIngredientAdded();
  }

  public onIngredientAdded(): void {
    this.igAddSubscription = this.shoppingListService.ingredientAdded
      .subscribe((ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      });
  }

  ngOnDestroy(): void {
    this.igAddSubscription.unsubscribe();
  }
}
