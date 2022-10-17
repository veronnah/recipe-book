import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from "../../models/ingredient.model";
import { ShoppingListService } from "../../services/shopping-list.service";
import { Subscription } from "rxjs";
import { routeFadeStateTrigger } from '../../shared/animations/fader';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss'],
  animations: [
    routeFadeStateTrigger,
  ],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  public ingredients: Ingredient[] = [];
  public isLoaded: boolean;
  private igAddSubscription: Subscription;


  constructor(private shoppingListService: ShoppingListService) {
  }

  ngOnInit(): void {
    this.getIngredients();
    this.onIngredientAdded();
  }

  public getIngredients(): void {
    this.shoppingListService.getIngredients()
      .subscribe((ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
        this.isLoaded = true;
      });
  }

  public onIngredientAdded(): void {
    this.igAddSubscription = this.shoppingListService.ingredientAdded
      .subscribe((ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      });
  }

  public onChecking(value: boolean, index: number): void {
    this.ingredients[index].isPurchased = value;
    this.shoppingListService.putIngredients(this.ingredients).subscribe();
  }

  public onEditItem(index: number): void {
    this.shoppingListService.editingItemIdx.next(index);
  }

  ngOnDestroy(): void {
    this.igAddSubscription?.unsubscribe();
  }
}
